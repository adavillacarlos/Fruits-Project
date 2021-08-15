//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection url
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'fruitsDB';

//Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

//Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    findDocuments(db,function(){
        client.close();
    }); 
   
});

const insertDocuments = function (db, callback) {
    //Get the documents collection
    const collection = db.collection('fruits');
    //Insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great Fruit"
        }, {
            name: "Orange",
            score: 6,
            review: "Sour Fruit"
        }, {
            name: "Banana",
            score: 9,
            review: "Great!"
        }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result);
        assert.equal(3, result.ops.length());
        console.log("Inserted 3 documents into the collections");
        callback(result);
    }); 
}; 


const findDocuments = function(db, callback){
    //Get the documents collection 
    const collection = db.collection('fruits');
    //Find some documents
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err,null); 
        console.log("Found the follow ing records");
        console.log(fruits);
        callback(fruits);
    }); 
}