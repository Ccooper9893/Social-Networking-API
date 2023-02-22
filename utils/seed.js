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
        email: 'james@email.com'
    },
];

const seedUsers = async () => {
    await User.deleteMany({});
    await User.insertMany(users);
};

seedUsers().then(() => {
    console.log('Users seeded!')
    mongoose.connection.close();
});

