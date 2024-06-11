// backend/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    bosses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Boss' }]
    });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;