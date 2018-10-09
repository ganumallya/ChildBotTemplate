var request = require("request");


var ReleaseKey = "14681199-0c09-4d7e-8d4a-5ca2c830b5cc";
var BotID = 55044;


var AuthenticateOptions = { method: 'POST',
  url: 'https://platform.uipath.com/api/account/authenticate',
  headers: 
   { 'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { tenancyName: 'xxx',
     usernameOrEmailAddress: 'xxxx',
     password: 'xxxx' },
  json: true };


var AddItemOptions = { method: 'POST',
  url: 'https://platform.uipath.com/odata/Queues/UiPathODataSvc.AddQueueItem%28%29',
  headers: 
   { 'Cache-Control': 'no-cache',
     'Content-Type': 'application/json',
     Authorization: 'Needs to be filled' },
  body: 
   { itemData: 
      { Name: 'ffqueue',
        Priority: 'Low',
        SpecificContent: 'Needs to be filled',
        DeferDate: null,
        DueDate: null } },
  json: true };

var StartJobOptions = { method: 'POST',
url: 'https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs',
headers: 
{   'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: 'Needs to be filled'  },
body: 
{ startInfo: 
    { ReleaseKey: ReleaseKey,
    RobotIds: [ BotID ],
    NoOfRobots: 0,
    Strategy: 'Specific' } },
json: true };


function Authenticate(QueueItem){
    request(AuthenticateOptions, function (error, response, body) {
        if (error) throw new Error(error);
          console.log("Credentials Generated");
          AddItem(QueueItem,"bearer "+body.result)
      });
}


function AddItem(QueueItem,Cred){
    AddItemOptions.headers.Authorization = Cred;
    AddItemOptions.body.itemData.SpecificContent = QueueItem;
    request(AddItemOptions, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("Queue Item Added");
        StartJob(Cred);
      });      
}

function StartJob(Cred){
    StartJobOptions.headers.Authorization = Cred;
    request(StartJobOptions, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("Job Started");
      });      
}




module.exports= (QueueItem) => {
    Authenticate(QueueItem);
}