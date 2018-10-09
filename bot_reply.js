const pre_chats = ["I got a knowledge centre article that might help", "I have found an article for you."],
    post_chats = ["Did that help?", "Did that resolve the issue?"],
    sorry_Message = ["Looks like I’m not solving your problem.", "Sorry, I am not able to help", "I am sorry, I won't be able to help."],
    helped_message = ["Glad that it helped", "I am glad that it helped."],
    Connect_LiveAgent = ["To connect with a human support agent, click https://sdchat.corp.adobe.com", "Our live agent can help you with this issue. To initiate a chat click https://sdchat.corp.adobe.com"],
    needHelpDialog = ["Sure, I am here to assist you with IT related queries or issues."],
    couldntUnderstand = ["I never heard it before", "I am sorry but I am not sure how to help you. Please try rephrasing your question.", "I’m sorry, but I’m not sure how to answer that. Could you try rephrasing your question?" , "Sorry, I have never heard it before. A human support agent could assist, click https://sdchat.corp.adobe.com to connect with them."],
    introductionStatement = ["Hello! My name is Eva and I am here to help you with IT related queries or issues"],
    precise_message = ["Sorry I didn’t understand “<text>”. Could you be more precise please?"];

module.exports = {
    pre: function () {
        return pre_chats[(Math.floor(Math.random() * pre_chats.length))];
    },
    post: function () {
        return post_chats[(Math.floor(Math.random() * post_chats.length))];
    },
    sorry_Message: function(){
        return sorry_Message[(Math.floor(Math.random() * sorry_Message.length))];
    },
    helped_message: function(){
        return helped_message[(Math.floor(Math.random() * helped_message.length))];
    },
    Connect_LiveAgent: function(){
        return Connect_LiveAgent[(Math.floor(Math.random() * Connect_LiveAgent.length))];
    },
    needHelpDialog: function(){
        return needHelpDialog[(Math.floor(Math.random() * needHelpDialog.length))];
    },
    couldntUnderstand: function(){
        return couldntUnderstand[(Math.floor(Math.random() * couldntUnderstand.length))];
    },
    introductionStatement: function(){
        return introductionStatement[(Math.floor(Math.random() * introductionStatement.length))];
    },
    precise_message:function(){
        return precise_message[(Math.floor(Math.random() * precise_message.length))];
    }

}