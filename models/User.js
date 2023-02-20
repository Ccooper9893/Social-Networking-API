const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ]
    },
    // thoughts: [thoughtsSchema],
    // friends: [friendsSchema],
});

const User = mongoose.model('user', userSchema);

User.create({username: 'Cody', email: 'cody_codster@live.com'}, (err, result) => {
    return result ? console.log('User created!') : console.log('Oops! Something went wrong.')
});

module.exports = User;
