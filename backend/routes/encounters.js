// backend/routes/encounters.js
const router = require('express').Router();
let Encounter = require('../models/Encounter');

router.route('/').get((req, res) => {
  Encounter.find()
    .then(encounters => res.json(encounters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newEncounter = new Encounter(req.body);

  newEncounter.save()
    .then(() => res.json('Encounter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;