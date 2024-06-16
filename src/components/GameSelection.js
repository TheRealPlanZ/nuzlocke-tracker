// src/components/GameSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamManagement from './TeamManagement';

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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Select a Game</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(game => (
          <li
            key={game._id}
            onClick={() => handleSelectGame(game)}
            className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
          >
            {game.name}
          </li>
        ))}
      </ul>
      {selectedGame && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Game Details</h3>
          <p className="mb-2">Routes:</p>
          <ul className="mb-4">
            {selectedGame.routes.map(route => (
              <li key={route._id} className="p-2 bg-gray-700 rounded mb-2">
                {route.name} - Available Pokémon: {route.availablePokemon.join(', ')}
              </li>
            ))}
          </ul>
          <p className="mb-2">Bosses:</p>
          <ul>
            {selectedGame.bosses.map(boss => (
              <li key={boss._id} className="p-2 bg-gray-700 rounded mb-2">
                {boss.name} - Team: {boss.team.join(', ')}
              </li>
            ))}
          </ul>
          <TeamManagement selectedGame={selectedGame} />
        </div>
      )}
    </div>
  );
};

export default GameSelection;