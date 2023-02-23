const {User, Thought} = require('../../models');
const assert = require('assert');

let user1;
let user2;
// this will run before running the tests
beforeEach(function(done) {
    // Creating a new Instance of User Model
    user1 = new User({  username: 'Cody', email: 'cody@email.com' });
    user2 = new User({ username: 'Greg', email: 'greg@email.com', friends: [user1._id]});
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

describe('Reading the details of Users', () => {
    it('Should find all users in the collection', (done) => {
        User.find({}, function(err, docs) {
            if(err) {
                done(err);
            };
            assert(docs.length >= 1);
            done();
        });
    });

    it('Should find a user by Object Id', (done) => {
        let id = user1._id.toString();
        User.findById(id, function(err, docs) {
            if(err) {
                done(err);
            };
            let testId = docs._id.toString();
            assert(testId === id);
            done();
        })
    });

    it('Should find a user by name', (done) => {
        User.findOne({ username: 'Cody'}, function(err, docs) {
            if(err) {
                done(err);
            };
            assert(docs.username === 'Cody');
            done();
        });    
    });
});