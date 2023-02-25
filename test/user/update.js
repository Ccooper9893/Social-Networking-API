const User = require('../../models/User');
const assert = require('assert');

let user1;
let user2;

// this will run before running the tests
beforeEach(function(done) {
    // Creating a new Instance of User Model
    user1 = new User({  username: 'David', email: 'david@email.com' });
    user2 = new User({ username: 'Sarah', email: 'sarah@email.com', friends: [user1._id]});
    user1.save()
        .then(() => {
            return user2.save();
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
});

describe('Updating the details of Users', () => {

    it('Should update the username of a user', (done) => {
        User.findOneAndUpdate({_id: user2._id}, {username: 'NewUsername'}, {runValidators: true, new: true})
            .then((updatedUser) => {
                assert(updatedUser.username === 'NewUsername');
                done();
            })
            .catch((err) => done(err))
    });

    it('Should add a new friend to a user friends list', (done) => {
        User.findOneAndUpdate({username: 'David'}, { $addToSet: {friends: user2._id}}, {runValidators: true, new: true})
            .then((updatedUser) => {
                assert(updatedUser.friends.includes(user2._id));
                done();
            })
            .catch((err) => done(err))
    });

    it('Should delete a friend from the user friends list', (done) => {
        User.findOneAndUpdate({username: 'David'}, {$pull: {friends: user2._id}}, {runValidators: true, new: true})
            .then((updatedUser) => {
                assert(!updatedUser.friends.includes(user2._id));
                done();
            })
            .catch((err) => done(err))
    });
});