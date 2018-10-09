var builder = require('botbuilder');

require('dotenv-extended').load({path: '.env'});


// Make sure you add code to validate these fields
const luisAppId = process.env.LUIS_APP_ID;
const luisAPIKey = process.env.LUIS_API_KEY;
const luisAPIHostName = process.env.LUIS_API_HOSTNAME;


const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey + '&verbose=true&timezoneOffset=0&q=';
console.log(LuisModelUrl);

// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

module.exports = recognizer;


