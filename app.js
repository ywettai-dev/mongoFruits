//require mongoose package
const mongoose = require('mongoose');

//establish mongoose connection
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true
});

//setup Schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//create model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Peach",
    rating: 7,
    review: "Peaches are awesome!"
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    //Create RS with Fruit
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 27
});

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 7,
    review: "Pineapples are yummy!"
});

Person.updateOne({
    _id: "5cf12eed44816f621c9cdd4b"
}, {
    favouriteFruit: pineapple
}, (err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Successfully updated the document!`)
    }
}));

// person.save();

/*const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Kiwis are awesome!"
});

const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "Too sour for me!"
});

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Weird texture!"
});

Fruit.insertMany([kiwi, orange, banana], (err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Successfully saved all the fruits to the fruitsDB!`);
    }
}));*/

Fruit.find((err, fruits) => {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        let count = 1;
        fruits.forEach(fruit => {
            console.log(`${count}.` + fruit.name);
            count++;
        });
    }
});

// Fruit.updateOne({
//     _id: "5cf13130d39b106447878dbf"
// }, {
//     name: "Durain",
//     review: "King of fruits!"
// }, (err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Successfully updated the document!`);
//     }
// }));

// Fruit.updateOne({
//     _id: "5cf13130d39b106447878dbf"
// }, {
//     rating: 10
// }, (err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Successfully updated the document!`);
//     }
// }));

// Fruit.deleteOne({
//     name: "Durain"
// }, (err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Successfully deleted the document!`);
//     }
// }));