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
    thoughts: [{ //References a Thought document with a specific Id
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{ //References a Thought document with a specific Id
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    },
    {
        toJSON: { 
            virtuals: true, //Include virtuals when converting document to JSON
        },
        
        id: false, //Don't include the ids
        strictQuery: false,
    },
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
