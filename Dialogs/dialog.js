var builder = require('botbuilder');

const logger = require('../logger');
const bot_reply = require('../bot_reply');
const {luis, qna_maker} = require('../Config/config');
const ConfirmPrompt = require('./Custom_Prompts/confirmation_prompt');

module.exports = (bot) => {
    
    // Import Luis Recognizer
    bot.recognizer(luis);
    // Import QnA Recognizer
    bot.recognizer(qna_maker);

    //Sample Dialog
    require('../Dialogs/Sample/sampleDialog')(bot);

    //Qna dialog
    require('../Dialogs/qna_dialog')(bot);
    require('../Dialogs/precise_dialog')(bot);
    

    //default Dialog
    bot.dialog('/default', function(session){
        
        console.log("Reached None Intent");
        var bot_response = bot_reply.couldntUnderstand()  + " \n" + bot_reply.Connect_LiveAgent();
        logger.warn({"untrained_text": session.message.text, "status": "warn", session, bot_response});
        session.endDialog(bot_response);

	}).triggerAction({
        matches: 'None',
    });

    //Custom Prompt Registerations
    bot.dialog('ConfirmationPrompt', ConfirmPrompt);

    // Add function for calling your prompt from anywhere
    builder.Prompts.ConfirmationPrompt = function (session, prompt, options) {
        var args = options || {};
        args.prompt = prompt || options.prompt;
        session.beginDialog('ConfirmationPrompt', args);
    };
};
