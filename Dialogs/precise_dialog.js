var builder = require('botbuilder');

const bot_reply = require('../bot_reply');
const logger = require('../logger');
const {config} = require('../Config/config');

module.exports = (bot) => {
    
    bot.dialog('precise', [
        function (session, args, next) {

            if(args.intent.score > config.RELATED_THRESHOLD){
                                
                var topic_name = '';
                if(args.intent.intent == 'qna'){
                    var metadataEntity = args.intent.answers[0].metadata;
                    for (let index = 0; index < metadataEntity.length; index++) {
                        if(metadataEntity[index].name == "topic_name"){
                            topic_name = metadataEntity[index].value;
                        }
                    }
                    session.privateConversationData.callDialog = 'qna';
                }else{
                    var topic_name = args.intent.intent;
                    session.privateConversationData.callDialog = args.intent.intent;
                }

                var bot_response = "Is it related to "+ topic_name; 
                session.privateConversationData.AskedQuestion = session.message.text;
                session.privateConversationData.intent = args.intent;
                logger.info({session, args, bot_response});
                builder.Prompts.ConfirmationPrompt(session, bot_response);
            }else{
                var bot_response = bot_reply.precise_message().toString().replace("<text>",session.message.text); 
                logger.warn({"untrained_text": session.message.text, "status": "warn", session, bot_response});
                session.send(bot_response);
            }
        },
        function(session,results){
            if(results.response == "yes"){
                args = session.privateConversationData.intent;
                session.replaceDialog(`/${session.privateConversationData.callDialog}`, {"intent" :args});
            }else{
                bot_response = bot_reply.sorry_Message()+"\n\n"+bot_reply.Connect_LiveAgent(); 
                logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "unresolved", session, bot_response});
                session.send(bot_response);
            }
        }

    ]).triggerAction({
        onFindAction:(session,callback) =>{ 
            if(session.intent == null){
                callback(null,0);
            }else if(session.intent.score > config.PRECISE_THRESHOLD && session.intent.score < config.CONFIDENCE_THRESHOLD && session.dialogStack().length < 2){
                callback(null,1,{"intent":session.intent});
            }else{
                callback(null,0);
            }
        }
    });
};