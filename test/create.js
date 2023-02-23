const assert = require('assert');
const { User, Thought } = require('../models');

let newThought;

describe('Creating mongoDB documents', () => {
    it('Should create a new User document', (done) => { //done parameter tells Mocha we are running asynchronous functions
        let newUser = new User({ username: 'Samantha', email: 'samantha@email.com' });
        newUser.save()
            .then(() => {
                assert(!newUser.isNew); //if the new User is saved in database, it is not new.
                done(); //Call to finish test
            })
            .catch((err) => done(err))
    });

    it('Should create a new Thought document', (done) => { //done parameter tells Mocha we are running asynchronous functions
        newThought = new Thought({ username: 'Samantha', thoughtText: 'Amazing!' });
        newThought.save()
            .then(() => {
                assert(!newThought.isNew); //if the new User is saved in database, it is not new.
                done(); //Call to finish test
            })
            .catch((err) => done(err))
    });

});





