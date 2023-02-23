const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    async getAllUsers(req, res) {
        User.find({}, function(err, docs) {
            err 
            ? res.status(500).json(err) 
            : res.status(200).json(docs)
        });
    },

    //Get a single user by id
    async getUserById(req, res) {
        const user = await User.findOne({ _id: req.params.id });
        !user 
        ? res.status(400).json({message: `No user found with id: ${req.params.id}`}) 
        : res.status(200).json(user);
    },

    //Create new user
    async createUser(req, res) {
        const user = await User.create(req.body);
        !user 
        ? res.status(400).json({ message: 'Please provide a valid username'}) 
        : res.status(200).json(user);
    },

    //Updates a user (username, email)
    async updateUser(req, res) {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {username: req.body.username}, {runValidators: true, new: true});
        !user 
        ? res.status(400).json({message: `No user found with id: ${req.params.id}`}) 
        : res.status(200).json(user);
    },

    //Delete user and thoughts
    async deleteUser(req, res) {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser) {
        const deleteThoughts = await Thought.deleteMany({ _id: {$in: deletedUser.thoughts}});
            res.status(200).json('User and thoughts deleted!')
        } else {
            res.status(400).json({message: `No user found with id: ${req.params.id}`})
        };
    }
};