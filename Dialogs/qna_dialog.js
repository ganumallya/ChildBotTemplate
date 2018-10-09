var builder = require('botbuilder');

const bot_reply = require('../bot_reply');
const logger = require('../logger');
const {config} = require('../Config/config');
const helper = require('./helper');

console.log('------CONFIDENCE_THRESHOLD------');
console.log(config.CONFIDENCE_THRESHOLD);

module.exports = (bot) => {
    
    bot.dialog('/qna', [
        function (session, args, next) {
            console.log("Reach QNA Block")

            var metadataEntity = args.intent.answers[0].metadata;
            session.privateConversationData.intent = args;
            session.message.user.convo_dialog_type = 'qna';

            args.intent.topic_name = '';
            args.intent.product_name = '';
            var kc_article = 0;
            for (let index = 0; index < metadataEntity.length; index++) {
                if(metadataEntity[index].name == "topic_name"){
                    args.intent.topic_name = metadataEntity[index].value;
                }else if(metadataEntity[index].name == "product_name"){
                    args.intent.product_name = metadataEntity[index].value;
                }else if(metadataEntity[index].name == "kc_article"){
                    kc_article = 1;
                }
            }

            var answerEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'answer');
            var pre_user_name = Math.round(Math.random())? `Sure `+session.message.user.name + `, \n\n`:``; 
            var luis_qna_response = answerEntity.entity;
            if(kc_article){
                var bot_response = pre_user_name + bot_reply.pre() + "\n\n " + luis_qna_response + "\n\n" +bot_reply.post();
            }else{
                var bot_response = pre_user_name + luis_qna_response + "\n\n" + bot_reply.post();
            }
            
            builder.Prompts.ConfirmationPrompt(session, bot_response);
            session.privateConversationData.AskedQuestion = session.message.text;
            logger.info({session, args, bot_response, luis_qna_response});

        },
        function(session,results){
            helper.endConversation(session,results);
        }
    ]).triggerAction({
        matches: 'qna',
        intentThreshold:config.CONFIDENCE_THRESHOLD
    });
};