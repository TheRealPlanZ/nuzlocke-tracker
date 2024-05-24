// backend/models/GymFight.js
const mongoose = require('mongoose');

const gymFightSchema = new mongoose.Schema({
    gymLeader: { type: String, required: true },
    team: [{ type: String, required: true }],
    outcome: { type: String, enum: ['win', 'loss'], required: true },
    userID:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }, {
    timestamps: true,
  });

  const GymFight = mongoose.model('GymFight', gymFightSchema);
  module.exports = GymFight;