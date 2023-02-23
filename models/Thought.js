const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, //Defines the type of field
        default: () => new Types.ObjectId(), //Generates a new id if none provided
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
            return require('moment')(timestamp).format('MM/DD/YYYY hh:mm:ss');
        }
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now, //If now() it will have the creation date of schema, not documents.
        get: function (timestamp) {
            // format timestamp using Moment.js library
            return require('moment')(timestamp).format('MM/DD/YYYY hh:mm:ss');
          },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }    
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

