const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');


// Set up GET all and POST at /api/thoughts

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.put('/:id', updateThoughtById);
router.delete('/:id', deleteThoughtById);
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;