const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    async getAllUsers(req, res) {
        try {
            let users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({message: 'There are no users in database.'})
        }
    },

    //Get a single user by id
    async getUserById(req, res) {
        try {
            let user = await User.findOne({ _id: req.params.id });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.id}`})
        }
    },

    //Create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Please provide a valid username'})
        }
    },

    //Updates a user (username, email)
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.id}, {username: req.body.username}, {runValidators: true, new: true});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.id}`})
        }
    },

    //Delete user and thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            const deleteThoughts = await Thought.deleteMany({ _id: {$in: deletedUser.thoughts}});
            res.status(200).json('User and thoughts deleted!');
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.id}`});
        };
    }
};