const router = require('express').Router();
const auth = require('../middlewares/auth');
const { setPlayerNameHandler, getPlayersHandler } = require('../controllers/playerController');

router.post('/:code/player', auth, setPlayerNameHandler);
router.get('/:code/players', auth, getPlayersHandler);

module.exports = router;