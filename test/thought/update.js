const {Thought} = require('../../models');
const assert = require('assert');

let thought;

// this will run before running the tests
beforeEach(function(done) {
    // Creating a new Instance of User Model
    thought = new Thought({ username: 'Stinkle', thoughtText: 'Great stuff, love to learn it someday!'});
    thought.save()
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        })
});

describe('Updating the details of Thoughts', () => {
    it('Should update the thought text', (done) => {
        Thought.findOneAndUpdate({ _id: thought._id }, {thoughtText: 'Thanks for teaching me!'}, { runValidators: true, new: true })
            .then((newThought) => {
                assert(newThought.thoughtText === 'Thanks for teaching me!');
                done();
            })
            .catch((err) => done(err))
    })

    it('Should add/delete a thought reaction', (done) => {//$addToSet: Adds elements to an array only if they do not already exist in the set.
        Thought.findOneAndUpdate({_id: thought._id}, { $addToSet: {reactions: {reactionBody: 'Cool!', username: 'Stinkle'}}}, {new: true})
            .then((updatedThought) => { //Saves the reaction document in Thoughts reactions array. Does not create a collection.
                assert(updatedThought.reactions.length >= 1);

                 Thought.findOneAndUpdate({_id: updatedThought._id}, { $pull: {reactions: {reactionId: updatedThought.reactions[0]._id}}}, {runValidators: true, new: true})
                    .then((updatedThought) => {
                        assert(!updatedThought.reactions.length); //Checking to see if reactions array is empty
                    })

                done();
            })
            .catch((err) => done(err))
    });
});