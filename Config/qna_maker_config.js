var cognitiveservices = require('botbuilder-cognitiveservices');
require('dotenv-extended').load({path: '.env'});

// -------- Q/A Recognizer registrations --------------
var Consolidated_QnAMaker = new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId: process.env.QNA_KBID, 
    authKey: process.env.QNA_KEY,
    endpointHostName: process.env.QNA_HOST,
    top: 4});

module.exports = Consolidated_QnAMaker;