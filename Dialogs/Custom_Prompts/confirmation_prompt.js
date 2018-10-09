var builder = require('botbuilder');

const {config} = require('../../Config/config');

var LuisHelperUrl = config.CONFIRMATION_LUIS_HELPER_URL;
var recognizer = new builder.LuisRecognizer(LuisHelperUrl);

module.exports = new builder.Prompt({ defaultRetryPrompt: "I am sorry to interrupt, but did my last response help in resolving your issue?" })
.onRecognize(function (context, callback) {
    recognizer.recognize(context,function(err,result){
        if (result && result.intent !== 'None') {
            if(result.intent == 'confirm' || result.intent == 'yes'){
                callback(null, result.score,"yes");
            }else if(result.intent == "no" || result.intent == 'did_not_help'){
                callback(null, result.score,"no");
            }else if(result.intent == "let_me_try" || result.intent == "wait"){
                callback(null,result.score,"try")
            }else{
                callback(null, 0.0);
            }
        } else {
            callback(null, 0.0);
        }
    })
});