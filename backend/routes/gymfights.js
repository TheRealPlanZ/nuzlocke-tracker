// backend/routes/gymfights.js
const router = require('express').Router();
let GymFight = require('../models/GymFight');

router.route('/').get((req, res) => {
  GymFight.find()
    .then(gymfights => res.json(gymfights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newGymFight = new GymFight(req.body);

    newGymFight.save()
    .then(() => res.json('GymFight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;