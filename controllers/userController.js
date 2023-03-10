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
            let user = await User.findOne({ _id: req.params.userId })
            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v' })
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.userId}`})
        }
    },

    //Create new user
    async createUser(req, res) {
        try {
            let user = await User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Please provide a valid username and email!'})
        }
    },

    //Updates a user (username, email)
    async updateUser(req, res) {
        try {
            let user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {runValidators: true, new: true});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.userId}`})
        }
    },

    //Delete user and thoughts
    async deleteUser(req, res) {
        try {
            let user = await User.findByIdAndDelete(req.params.userId);
            await Thought.deleteMany({ _id: {$in: user.thoughts}});
            res.status(200).json('User and thoughts deleted!');
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.userId}`});
        };
    },

    //Add a friend to users subdoc array
    async addFriend(req, res) {
        try {
            let user = await User.findOneAndUpdate({_id: req.params.userId}, { $addToSet: {friends: req.params.friendId}}, {new: true})
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.userId}`});
        }
    },

    //Delete a friend from users subdoc array
    async deleteFriend(req, res) {
        try {
            let user = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: `No user found with id: ${req.params.userId}`});
        }
    },
};