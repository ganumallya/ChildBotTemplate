var builder = require('botbuilder');

const bot_reply = require('../../bot_reply');
const logger = require('../../logger');
const {config} = require('../../Config/config');
const helper = require('../helper');

//Response Messages
var WinReply = `Adobe's corporate VPN client, Cisco AnyConnect enables you to connect to Adobe network from remote network. Latest version can be installed through App Catalog on Windows and Mac. For manual installation of VPN client, please refer Knowledge Center article, https://inside.corp.adobe.com/itech/kc/IT01478.html`;

var MacReply = `Adobe's corporate VPN client, Cisco AnyConnect enables you to connect to Adobe network from remote network. Latest version can be installed through App Catalog on Windows and Mac. For manual installation of VPN client, please refer Knowledge Center article, https://inside.corp.adobe.com/itech/kc/IT01478.html`;

var AndroidReply = `To connect to Adobe's VPN:
1. In the Google Play App store, search for AnyConnect by Cisco Systems, Inc.
2. Download and install the AnyConnect app.
3. Once the AnyConnect has finished installing, launch the app.
4. Select VPN Configuration VPN7, and tap OK.
5. Select I trust this application, then tap OK.
6. Select the region closest to your location.
Note: You might see a security warning. If this happens, tap Continue.
7. Tap Accept in the VPN banner to complete the connection.
Once you complete the initial setup, you can easily toggle the VPN connection on and off via the AnyConnect app. Doing so will let you access private Adobe resources, including the Adobe App Catalog.`;

var IOSReply = `In order to access Adobe intranet and internal services while not at an Adobe facility, you can connect using a virtual private network (VPN) connection.
Installing and Configuring Cisco AnyConnect VPN
Adobe's VPN connection is only available to regular Adobe (Type 1) employees.
To install and configure AnyConnect VPN:
1. Launch Adobe App Catalog on your iOS device.
2. Search for Cisco AnyConnect and tap install.
3. Once installed, launch Cisco AnyConnect.
4. Tap OK to enable the app.
5. Toggle the AnyConnect VPN setting to on to connect.
6. Accept the disclaimer.
7. Under Connections, choose the closest VPN server based on your location.
Installing and Configuring Cisco AnyConnect VPN
In order to access Adobe intranet and internal services while not at an Adobe facility, you can connect using a virtual private network (VPN) connection.
Adobe's VPN connection is only available to regular Adobe (Type 1) employees.
To install and configure AnyConnect VPN:
iOS devices are configured for on-demand VPN, which will allows the device to automatically connect if attempting to connect to an website or resource on the corporate network. If you prefer to manually establish a VPN connection, you must disable the on-demand VPN setting on your device.
To disable on-demand VPN on your iOS device:
1. On your device, tap Settings.
2. Tap VPN.
3. Select the info icon next to the selected connection (e.g. asa-sanjose.adobe.com).
4. Toggle off the Connect On Demand option.
Toggling VPN connections
To activate and deactivate your VPN connection use the Cisco AnyConnect app.
For security and performance reasons, it is important to only activate your VPN connection when you want to access Adobe resources. `;

var botResponce = `IT only supports 
1. Win
2. Mac
3. Android
4. iOS
Which one of these do you use?`;

const title = `VPNInstallation`;
const topic_name = `vpn installation`;
const product_name = `VPN`;

module.exports = (bot) => {
    bot.dialog(`/${title}` ,[
        function (session,args) {

            args.intent.topic_name = topic_name;
            args.intent.product_name = product_name;
            session.privateConversationData.intent = args;
            session.privateConversationData.AskedQuestion = session.message.text;
            session.message.user.convo_dialog_type = 'Conversation';

            if(args.intent.entities.length>0){
                if(args.intent.entities[0].resolution.values[0].toLowerCase()=="windows" ){
                    session.replaceDialog(`${title}+_win`, {'questionAsked':session.message.text,'device':"win", 'args':args});
                }else if(args.intent.entities[0].resolution.values[0].toLowerCase()=="mac"){
                    session.replaceDialog(`${title}+_mac`, {'questionAsked':session.message.text,'device':"mac", 'args':args});
                }else if(args.intent.entities[0].resolution.values[0].toLowerCase()=="android"){
                    session.replaceDialog(`${title}+_android`, {'questionAsked':session.message.text,'device':"android", 'args':args});
                }else if(args.intent.entities[0].resolution.values[0].toLowerCase()=="ios"){
                    session.replaceDialog(`${title}+_ios`, {'questionAsked':session.message.text,'device':"ios", 'args':args});
                }else{
                    bot_response = botResponce;
                    logger.info({session, args, bot_response});
                    builder.Prompts.text(session, bot_response);
                };
            }else{
                bot_response = botResponce;
                logger.info({session, args, bot_response});
                builder.Prompts.text(session, bot_response);
            }

        },function(session,results){

            args = session.privateConversationData.intent;

            if(results.response.toLowerCase().includes("win") || results.response.toLowerCase().includes("1")){
                session.replaceDialog(`${title}+_win`, {'questionAsked':session.message.text,'device':"win", 'args':args});
            }else if(results.response.toLowerCase()=="mac" || results.response.includes("2")){
                session.replaceDialog(`${title}+_mac`, {'questionAsked':session.message.text,'device':"mac", 'args':args});
            }else if(results.response.toLowerCase()=="android" || results.response.includes("3")){
                session.replaceDialog(`${title}+_android`, {'questionAsked':session.message.text,'device':"android", 'args':args});
            }else if(results.response.toLowerCase()=="ios" || results.response.includes("4")){
                session.replaceDialog( `${title}+_ios`, {'questionAsked':session.message.text,'device':"other", 'args':args});
            }else{
                bot_response = "Sorry, Currently IT support only Win, Mac, Android and iOS." + " \n" + bot_reply.Connect_LiveAgent();
                logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "answernotfound", session, bot_response});
                session.endDialog(bot_response);
            }
        }
    ]).triggerAction({
        matches: title,
        confirmPrompt: 'Are you sure about changing the topic?',
        intentThreshold:config.CONFIDENCE_THRESHOLD
    });

    bot.dialog(`${title}+_win`,[
        function (session,args) {
            bot_response = WinReply + " \n \n " + bot_reply.post();
            args = args.args;
            session.privateConversationData.intent = args;

            logger.info({session, args, bot_response});
            builder.Prompts.ConfirmationPrompt(session,bot_response);
        },
        function(session,results){
            helper.endConversation(session,results);
        }
    ]);

    bot.dialog(`${title}+_mac`,[
        function (session,args) {
            bot_response = MacReply + " \n \n " + bot_reply.post();
            args = args.args;
            session.privateConversationData.intent = args;

            logger.info({session, args, bot_response});
            builder.Prompts.ConfirmationPrompt(session,bot_response);
        },
        function(session,results){
            helper.endConversation(session,results);
        }
    ]);

    bot.dialog(`${title}+_android`,[
        function (session,args) {
            bot_response = AndroidReply + " \n \n " + bot_reply.post();
            args = args.args;
            session.privateConversationData.intent = args;

            logger.info({session, args, bot_response});
            builder.Prompts.ConfirmationPrompt(session,bot_response);
        },
        function(session,results){
            helper.endConversation(session,results);
        }
    ]);

    bot.dialog(`${title}+_ios`,[
        function (session,args) {
            bot_response = IOSReply + " \n \n " + bot_reply.post();
            args = args.args;
            session.privateConversationData.intent = args;

            logger.info({session, args, bot_response});
            builder.Prompts.ConfirmationPrompt(session,bot_response);
        },
        function(session,results){
            helper.endConversation(session,results);
        }
    ]);

};
