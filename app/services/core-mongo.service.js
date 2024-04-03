const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = "stack-1";

// const db = () => {
//  return new Promise((res, rej) => {
//    console.log("Connecting to MongoDB...");
//    MongoClient.connect(dbUrl, (err, client) => {
//      if (err) {
//        console.error("Error connecting to MongoDB:", err);
//        rej(err);
//      } else {
//        console.log("Connected to MongoDB!");
//        const db_obj = client.db(dbName);
//        res(db_obj);
//      }
//    });
//  });
// };
const connectToDatabase = async () => {
 const client = new MongoClient(dbUrl);

 try {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(dbName);
 } catch (error) {
  console.error('Error connecting to MongoDB:', error);
  throw error;
 }
};


module.exports = connectToDatabase;
