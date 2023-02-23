const {User, Thought} = require('../../models');
const assert = require('assert');

let thought;

// this will run before running the tests
beforeEach(function(done) {
    // Creating a new Instance of User Model
    thought = new Thought({ username: 'Nick', thoughtText: 'Amazing!' });
    thought.save()
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        })
});

describe('Reading details of Thoughts', () => {
    it('Should find all thoughts in the collection', (done) => {
        Thought.find({}, function(err, docs) {
            if(err) {
                done(err)
            };
            assert(docs.length >= 1);
            done();
        });
    });

    it('Should find a thought by Object Id', (done) => {
        id = thought._id.toString();
        Thought.findById(id, function(err, docs) {
            if(err) {
                done(err);
            };
            testId = docs._id.toString();
            assert(testId === id);
            done();
        })
    })
});