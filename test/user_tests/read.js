const User = require('../../models/User');
const assert = require('assert');
  
let user;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of User Model
    user = new User({  name: 'Shriyam' });
    user.save()
        .then(() => done());
});

describe('Reading the details of User', () => {
    it('It should find a user with a name', (done) => {
        User.findOne({ username: 'Cody'})
            .then((user) => {
                assert(user.username === 'Cody');
                done();
            });
    });
});