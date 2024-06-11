// backend/models/Boss.js
const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: [{ type: String, required: true }],
});

const Boss = mongoose.model('Boss', bossSchema);
module.exports = Boss;