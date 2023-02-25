//I recommend seeding the database using Postman or Insomnia. This way the thoughts can be directly linked to the users by ID.
//Seeding here will create thoughts but, will not be associated with any user document.

const mongoose = require('mongoose');
const { User, Thought } = require('../models');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { console.log('Connection established!') })
.catch((err) => console.log(err))

const users = [
    {
        username: 'John',
        email: 'john@email.com',
    },
    {
        username: 'Sam',
        email: 'sam@email.com',
    },
    {
        username: 'James',
        email: 'james@email.com',
    },
];

const thoughts = [
    {
        thoughtText: 'Great job, look forward to more!',
        username: 'James',
    },
    {
        thoughtText: 'Thumbs up emoji!',
        username: 'Sam',
    },
    {
        thoughtText: 'Agree to disagree.',
        username: 'John',
    },
];

const seedDatabase = async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
};

seedDatabase().then(() => {
    console.table(users);
    console.table(thoughts);
    console.log('Database seeded!');
    mongoose.connection.close();
});

