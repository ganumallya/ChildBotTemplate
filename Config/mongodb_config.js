var MongoClient = require('mongodb').MongoClient;    
require('dotenv-extended').load({path: '.env'});

const user_pass = (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD)?`${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@`:``;

var mongo = {
    "MONGO_URL":`mongodb://${user_pass}${process.env.MONGO_HOST}/`,
    "MONGO_DB_NAME":`${process.env.MONGO_DATABASE_NAME}`,
    "MONGO_BOT_PREFIX":`${process.env.BOT_NAME}_`
};

mongo.insertLogs = function (collection_name, myobj){
    MongoClient.connect(`${mongo.MONGO_URL}${mongo.MONGO_DB_NAME}`, function(err, db) {
        if (err) throw err;
        console.log(`${mongo.MONGO_URL}${mongo.MONGO_DB_NAME}`);
        
        db.collection(collection_name).insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
};

module.exports = mongo;