/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');
var LuisActions = require('botbuilder-cognitiveservices').LuisActionBinding;
const bot_reply = require('./bot_reply');

require('dotenv-extended').load({path: '.env'});

var myMiddleware = require('./middleware');
const logger = require('./logger');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({ appId: "", appPassword: "" });

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var in_memory_storage = new builder.MemoryBotStorage();

var bot = new builder.UniversalBot(connector,(session) => {
    
    var bot_response = bot_reply.couldntUnderstand() + " \n" + bot_reply.Connect_LiveAgent();
    logger.warn({"untrained_text": session.message.text, "status": "warn", session, bot_response});
    session.endDialog(bot_response);

}).set('storage', in_memory_storage);

bot.use({
    botbuilder: function (session, next) {
        myMiddleware.logIncomingMessage(session, next);
    },
    send: function (event, next) {
        myMiddleware.logOutgoingMessage(event, next);
        
    }
});


// Route any conversations to respective dialogs
require('./Dialogs/dialog')(bot);





