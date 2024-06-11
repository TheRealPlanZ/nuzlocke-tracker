// backend/models/Route.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    availablePokemon: [{ type: String, required: true }],
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;

