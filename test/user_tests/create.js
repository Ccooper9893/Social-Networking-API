const assert = require('assert');
const User = require('../../models/User');

describe('Connecting to MongoDB', () => {
    it('Should create a new User document', (done) => { //done parameter tells Mocha we are running asynchronous functions
        const newUser = new User({ username: 'Cody', email: 'cody@email.com' });
        newUser.save()
            .then(() => {
                assert(!newUser.isNew); //if the new User is saved in database, it is not new.
                done(); //Call to finish test
            });
    });
});





