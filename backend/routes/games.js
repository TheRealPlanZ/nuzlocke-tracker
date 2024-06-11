// backend/routes/games.js
const router = require('express').Router();
let Game = require('../models/Game');
let Route = require('../models/Route');
let Boss = require('../models/Boss');

router.route('/').get((req, res) => {
  Game.find()
    .populate('routes')
    .populate('bosses')
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newGame = new Game(req.body);

  newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;