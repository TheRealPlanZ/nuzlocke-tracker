// src/components/GameSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameSelection = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/games')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the games!', error);
      });
  }, []);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <div>
      <h2>Select a Game</h2>
      <ul>
        {games.map(game => (
          <li key={game._id} onClick={() => handleSelectGame(game)}>
            {game.name}
          </li>
        ))}
      </ul>
      {selectedGame && (
        <div>
          <h3>Game Details</h3>
          <p>Routes:</p>
          <ul>
            {selectedGame.routes.map(route => (
              <li key={route._id}>
                {route.name} - Available Pokémon: {route.availablePokemon.join(', ')}
              </li>
            ))}
          </ul>
          <p>Bosses:</p>
          <ul>
            {selectedGame.bosses.map(boss => (
              <li key={boss._id}>
                {boss.name} - Team: {boss.team.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameSelection;