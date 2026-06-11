const { createError } = require('../middlewares/errorHandler');
const { getRoom, getPlayer, removePlayer } = require('../utils/roomManager');

function getSessionHandler(req, res, next) {
  try {
    const { playerId, roomCode, isHost } = req.session;

    if (!playerId || !roomCode) {
      return res.json({ valid: false });
    }

    const room = getRoom(roomCode);
    if (!room) {
      req.session.destroy(() => {});
      return res.json({ valid: false });
    }

    const player = getPlayer(roomCode, playerId);
    if (!player) {
      req.session.destroy(() => {});
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      roomCode,
      gameType: room.gameType,
      phase: room.phase,
      player: { id: playerId, name: player.name, isHost },
    });
  } catch (err) {
    next(err);
  }
}

function clearSessionHandler(req, res, next) {
  try {
    const { playerId, roomCode } = req.session;

    if (playerId && roomCode) {
      removePlayer(roomCode, playerId);
    }

    req.session.destroy(err => {
      if (err) return next(createError(500, 'SESSION_ERROR', 'Failed to clear session'));
      res.json({ message: 'Session cleared' });
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSessionHandler, clearSessionHandler };