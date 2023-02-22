const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
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
    thoughts: { //References a Thought document with a specific Id
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
    friends: { //References a Thought document with a specific Id
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = model('user', userSchema);

module.exports = User;

//Testing
// User.create({username: 'Cody', email: 'cody_codster@live.com'}, (err, result) => {
//     return result ? console.log('User created!') : console.log('Oops! Something went wrong.')
// });
