// backend/models/Encounter.js
const mongoose = require('mongoose');

const EncounterSchema = new mongoose.Schema({
  route: { type: String, required: true },
  pokemon: { type: String, required: true },
  level: { type: Number, required: true },
  nature: { type: String, required: true },
  ability: { type: String, required: true },
  moves: { type: String, required: true },
  status: { type: String, enum: ['caught', 'fainted', 'skipped'], required: true },
  userID:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
  });

const Encounter = mongoose.model('Encounter', EncounterSchema);
module.exports = Encounter;