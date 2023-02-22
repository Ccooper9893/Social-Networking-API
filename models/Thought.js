const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId, //Defines the type of field
        default: mongoose.Types.ObjectId(), //Generates a new id if none provided
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(date) { //Getter to format the createdAt date to YYYY/MM/DD HH:MM:SS
            return date.toLocaleString('en-US', { timeZone: 'UTC' });
        }
    }
});

//Getter for returning a formatted date
reactionSchema.virtual('formattedCreatedAt').get(function() {
    this.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now, //If now() it will have the creation date of schema, not documents.
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;

