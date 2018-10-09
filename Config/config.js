const luis = require('./luis_config');
const qna_maker = require('./qna_maker_config');
const mongo = require('./mongodb_config');

//Threshold confidence % to be used for selecting response
const config = {
    "PRECISE_THRESHOLD" : 0.15,
    "RELATED_THRESHOLD" : 0.40,
    "CONFIDENCE_THRESHOLD" : 0.70,
    "CONFIRMATION_LUIS_HELPER_URL":'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/31d5dfc2-7ac4-481b-9aeb-2d7a6c8e8a15?subscription-key=b266d94e6c7b45cabf72cea309ffd1f7&verbose=true&timezoneOffset=0&q='
};

module.exports = {
    luis: luis,
    qna_maker:qna_maker,
    config: config,
    mongo:mongo
}
