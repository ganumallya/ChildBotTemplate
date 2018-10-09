module.exports = {
    logIncomingMessage: function (session, next) {
        console.log("-------------Incoming message -----------");
        console.log(session.message.text);
        next();
    },
    logOutgoingMessage: function (event, next) {
        console.log("-------------Outgoing message -----------")
        console.log(event.text);
        next();
    }
}