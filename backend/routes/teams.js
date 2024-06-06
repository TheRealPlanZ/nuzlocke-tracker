// backend/routes/teams.js
const router = require('express').Router();
let Team = require('../models/Team');

router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newTeam = new Team(req.body);

  newTeam.save()
    .then(() => res.json('Team added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
