const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getAllUsers(req, res) {
        User.find({}, function(err, docs) {
            err ? res.status(500).json(err) : res.status(200).json(docs)
        });
    },

    //Get a single user by id
    async getUserById(req, res) {
        const user = await User.findOne({ _id: req.params.id });
        !user ? res.status(400).json({message: `No user found with id: req.params.id`}) : res.status(200).json(user);
    },
}