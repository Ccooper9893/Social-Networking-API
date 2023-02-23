const { User, Thought } = require('../models');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            !thoughts ? res.status(400).json({message: 'No thoughts found'}) : res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json(err)
        }
    },

    //Get thought by Id
    async getThoughtById(req, res) {
        try {
        const thought = await Thought.findById(req.params.id);
        !thought ? res.status(400).json({message: `No thought found by id: ${req.params.id}`}) : res.status(200).json(thought);
        }
        catch(err) {
            res.status(500).json(err)
        }
    },

    //Create thought and assign it to user
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const updatedUser = await User.findOneAndUpdate({_id: req.body.userId}, { $addToSet: {thoughts: thought._id}});
            res.status(200).json(thought);  
        } catch (err) {
            res.status(400).json({message: `Could not find user with id: ${req.body.userId}!`});
        };
    }
};