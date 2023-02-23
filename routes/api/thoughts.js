const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, createReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById);
router.route('/:thoughtId/reactions/').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// .delete(deleteReaction);
// router.route('/:thoughtId/reactions/:reactionId')

module.exports = router;