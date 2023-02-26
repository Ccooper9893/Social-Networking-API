const { User, Thought } = require('../models');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        try {
            let thoughts = await Thought.find({});
            !thoughts ? res.status(400).json({message: 'No thoughts found'}) : res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json(err)
        }
    },

    //Get thought by Id
    async getThoughtById(req, res) {
        try {
        let thought = await Thought.findById(req.params.thoughtId)
        .populate({path: 'reactions', select: '-__v'})
        res.status(200).json(thought);
        }
        catch(err) {
            res.status(400).json({message: `No thought documents were found with id: ${req.params.thoughtId}`});
        };
    },

    //Create thought and assign it to user
    async createThought(req, res) {
        try {
            let thought = await Thought.create(req.body);
            let updatedUser = await User.findOneAndUpdate({_id: req.body.userId}, { $addToSet: {thoughts: thought._id}});
            res.status(200).json(thought);  
        } catch (err) {
            res.status(400).json({message: `Could not find user with id: ${req.body.userId}!`});
        };
    },

    // Update thought text using id
    async updateThoughtById(req, res) {
        try {
            let updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {thoughtText: req.body.thoughtText}, {runValidators: true, new: true});
            res.status(200).json({message: 'Thought has been updated!'});
        } catch (error) {
            res.status(400).json({message: `No thought documents were found with id: ${req.params.thoughtId}`})
        }
    },

    //Delete a thought by ID
    async deleteThought(req, res) {
        try {
            let thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            let user = await User.findOneAndUpdate({thoughts: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true});
            res.status(200).json({message: 'Thought has been deleted!'});
        } catch (error) {
            res.status(400).json('No user and/or thought found with the provided id!')
        }
    },

    //Added a reaction to a thought document
    async createReaction(req, res) {
        if(!req.body.username || !req.body.reactionBody) {
            return res.status(400).json({message: 'Please provide both a reaction body and username!'});
        }
        try {
            let updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reactions: {reactionBody: req.body.reactionBody, username: req.body.username}}});
                res.status(200).json(updatedThought);
        } catch (error) {
            res.status(400).json({message: `Please provide the required data to create the reaction!`});
        }
    },

    async deleteReaction(req, res) {
        try {
            let thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $pull: {reactions: {_id: req.params.reactionId}}}, {new: true});
            res.status(200).json(thought);
        } catch (error) {
            res.status(400).json({message: `No thought and/or reaction documents were found with provided id!`});
        }
    }
};