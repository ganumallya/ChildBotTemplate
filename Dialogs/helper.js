const logger = require('../logger');
let bot_reply = require('../bot_reply');

module.exports = {

    endConversation : function(session, results) {
        args = session.privateConversationData.intent;
        if(results.response == "yes"){
            bot_response = bot_reply.helped_message();
            
            logger.info({session,args,bot_response});
            session.endDialog(bot_response);
        }else if (results.response == "no"){
            bot_response = bot_reply.sorry_Message() + " \n" + bot_reply.Connect_LiveAgent();

            logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "unresolved", session, bot_response});
            session.endDialog(bot_response);
        }else if (results.response=="try"){
            bot_response = "Yeah sure \n" 
            logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "unresolved", session, bot_response});
            session.endDialog(bot_response);
        }else{
            bot_response = bot_reply.sorry_Message()+"\n\n"+bot_reply.Connect_LiveAgent(); 
            logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "unresolved", session, bot_response});
            session.endDialog(bot_response);
        }
    }
}