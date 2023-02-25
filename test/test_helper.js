//This is a helper file for connection to a sandboxed database
const mongoose = require('mongoose');
require('dotenv').config();

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDBTesting'); //Connects to local testing database

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
         //this function runs after the drop is completed
        done(); //continue, everything is done now.
    }); 
});
