// backend/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pokemon: [{ type: String, required: true }],
    public: { type: Boolean, required: false },
    userID:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }, {
    timestamps: true,
  });

  const Team = mongoose.model('Team', teamSchema);
  module.exports = Team;