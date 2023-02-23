const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getAllUsers(req, res) {
        User.find({}, function(err, docs) {
            err ? res.status(500).json(err) : res.status(200).json(docs)
        });
    },
}