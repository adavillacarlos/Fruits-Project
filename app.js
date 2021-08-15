//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: [true,"No name specified"]
    },
    rating: {
        type: Number,
        min: 1, 
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema); //collection, schema
const fruit = new Fruit({
    // name: "Apple",
    rating: 10,
    review: "peaches solid as a fruit" 
}); 

const pineapple = new Fruit({
    name: "Pineapple", 
    rating: 9, 
    review: "Great fruit."
})

const mango = new Fruit({
    name: "Mango", 
    rating: 6, 
    review: "yellow fruit"
})
mango.save();
// pineapple.save();
//  fruit.save();

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favouriteFruit: fruitSchema
}); 

const Person = mongoose.model("Person",personSchema);

const person = new Person({
    name: "John", 
    age: 32
}); 

// person.save();

// const kiwi = new Fruit({
//     name: "Kiwi", 
//     score: 10, 
//     review: "Fantastic"
// });

// const orange = new Fruit({
//     name: "Orange", 
//     score: 5, 
//     review: "Too sour for me"
// }); 

// const banana = new Fruit({
//     name: "Banana", 
//     score: 7, 
//     review: "Okayish"
// });

// Fruit.insertMany([kiwi,orange,banana], function(err){
//     if(err)
//         console.log(err); 
//     else 
//         console.log("saved all the fruits to fruitsdb");
// }); 

Fruit.find(function(err,fruits){
    if(err)
        console.log(err);
    else{
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
    mongoose.connection.close();
});


// Fruit.updateOne({_id: "6118b3ee5617deabdcf64506"}, {name: "Peach"}, function(err){
//     if(err)
//         console.log(err); 
//     else
//         console.log("updated document");
// }); 


// Fruit.deleteOne({name:"Peach"}, function(err){
//     if(err)
//         console.log(err);
//     else 
//         console.log("deleted one file"); 
// }); 


// Person.deleteMany({name:"John"} , function(err){
//     if(err)
//         console.log(err);
//     else 
//         console.log("deleted files");
// });



Person.updateOne({name: "John"}, {favouriteFruit:mango}, function(err){
    if(err)
        console.log(err);
    else
        console.log("updated john"); 
})