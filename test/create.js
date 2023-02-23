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
            });
    });

    it('Should create a new Thought document', (done) => { //done parameter tells Mocha we are running asynchronous functions
        newThought = new Thought({ username: 'Samantha', thoughtText: 'Amazing!' });
        newThought.save()
            .then(() => {
                assert(!newThought.isNew); //if the new User is saved in database, it is not new.
                done(); //Call to finish test
            });
    });

    it('Should create a new Reaction document', (done) => {
        Thought.findOneAndUpdate({_id: newThought._id}, { $addToSet: {reactions: {reactionBody: 'Cool!', username: 'Samantha'}}}, {new: true})
            .then((updatedThought) => { //Saves the reaction document in Thoughts reactions array. Does not create a collection.
                assert(updatedThought.reactions.length >=1);
                done();
            })
            .catch((err) => done(err))
    });
});





