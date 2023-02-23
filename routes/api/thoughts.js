const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, createReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById).put(updateThoughtById);
router.route('/:id/reactions').post(createReaction).delete(deleteReaction); //Needs work

module.exports = router;