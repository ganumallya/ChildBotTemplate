const winston = require('winston');

require('dotenv-extended').load({path: '.env'});
const {mongo} = require('./Config/config');

const maskFormat = winston.format(info => {    
    if(info.message.hasOwnProperty('untrained_text')){
        
        info.message = { 
            "untrained_text": info.message.untrained_text, 
            "query": info.message.session.message.text, 
            "response": info.message.bot_response, 
            "user_name":info.message.session.message.user.name, 
            "user_id":info.message.session.message.user.ldap, 
            "location":info.message.session.message.user.location, 
            "conversation_id":info.message.session.message.address.conversation.id, 
            "created_date": new Date(), 
            "bot": `${process.env.BOT_NAME}`,
            "status": info.message.status,
            "channel":"jabber"
        };
        mongo.insertLogs(`${process.env.BOT_NAME}_Untrained`, info.message);
        mongo.insertLogs(`${process.env.BOT_NAME}_Info`, info.message);

    }else{

        info.message = { 
            "query": info.message.session.message.text, 
            "response": info.message.bot_response, 
            "luis_qna_response": info.message.luis_qna_response, 
            "user_name":info.message.session.message.user.name, 
            "user_id":info.message.session.message.user.ldap, 
            "location":info.message.session.message.user.location, 
            "conversation_id":info.message.session.message.address.conversation.id, 
            "created_date": new Date(), 
            "intent_name":info.message.args.intent.intent, 
            "intent_score":info.message.args.intent.score, 
            "topic_name": info.message.args.intent.topic_name, 
            "product_name":info.message.args.intent.product_name, 
            "bot": `${process.env.BOT_NAME}_`,
            "status": "normal",
            "channel":"jabber"
        };
        mongo.insertLogs(`${process.env.BOT_NAME}_Info`, info.message);

    }

    return info;
});

var transports = [
    new winston.transports.File({ filename: './Logs/error.log', level: "error" }),
    new winston.transports.File({ filename: './Logs/untrained.log', level: "warn" }),
    new winston.transports.File({ filename: './Logs/info.log', level : "info"})
];
console.log('------mongo------');
console.log(mongo); 

const logger = winston.createLogger({
    level:"info",
    format: winston.format.combine(
        maskFormat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports: transports
});


module.exports = logger;