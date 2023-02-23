const {User, Thought} = require('../../models');
const assert = require('assert');
  
let user;
let thought;
// this will run before running the tests
beforeEach(function(done) {
    // Creating a new Instance of User Model
    
    thought = new Thought({thoughtText: 'Awesome article!', username: 'Carl'})
    user = new User({  username: 'Carl', email: 'card@email.com', thoughts: thought });
    user.save()
        .then(() => {
            return thought.save();
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
});

describe('Deleting a user and thoughts', () => {
    it('Should delete both the user and thoughts', (done) => {
        User.findOneAndDelete({_id: user._id})
            .then((user) => {

                Thought.deleteMany({ _id: {$in: user.thoughts }})
                    .then((thought) => {
                        assert(thought); //If thought is not null, it has been deleted
                    })
                    .catch((err) => done(err))

                assert(user); //If user is not null, it has been deleted
                done();
            })
            .catch((err) => done(err))
    });

    it('Should delete a thought by id', () => {
        Thought.findOneAndDelete({ _id: thought._id })
            .then((thought) => {
                assert(thought);
                done()
            })
            .catch((err) => done(err))
    });
});