const router = require('express').Router();
const { getSessionHandler, clearSessionHandler } = require('../controllers/sessionController');

router.get('/', getSessionHandler);
router.delete('/', clearSessionHandler);

module.exports = router;