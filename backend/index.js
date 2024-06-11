// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nuzlockeTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const encounterRouter = require('./routes/encounters');
const gymFightRouter = require('./routes/gymfights');
const teamRouter = require('./routes/teams');
const battleHistoryRouter = require('./routes/battlehistories');
const gameRouter = require('./routes/games');

app.use('/encounters', encounterRouter);
app.use('/gymfights', gymFightRouter);
app.use('/teams', teamRouter);
app.use('/battlehistories', battleHistoryRouter);
app.use('/games', gameRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});