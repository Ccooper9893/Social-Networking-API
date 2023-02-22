const mongoose = require('mongoose');

// const reactionSchema = new mongoose.Schema({
//     reactionId: mongoose.objectId(),
    
// })

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

