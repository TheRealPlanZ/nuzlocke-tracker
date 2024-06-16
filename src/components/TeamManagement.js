// src/components/TeamManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamManagement = ({ selectedGame }) => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [pokemon, setPokemon] = useState('');

  useEffect(() => {
    if (selectedGame) {
      axios.get(`http://localhost:5000/teams?gameId=${selectedGame._id}`)
        .then(response => {
          setTeams(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the teams!', error);
        });
    }
  }, [selectedGame]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = {
      name: teamName,
      pokemon: pokemon.split(','),
      gameId: selectedGame._id,
    };

    axios.post('http://localhost:5000/teams/add', newTeam)
      .then(response => {
        setTeams([...teams, response.data]);
        setTeamName('');
        setPokemon('');
      })
      .catch(error => {
        console.error('There was an error adding the team!', error);
      });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Team Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Pokémon (comma separated):</label>
          <input
            type="text"
            value={pokemon}
            onChange={(e) => setPokemon(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 rounded mt-4">Add Team</button>
      </form>
      <h3 className="text-xl font-bold mb-4">Teams for {selectedGame ? selectedGame.name : 'Selected Game'}</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg mb-2">
            <strong>{team.name}</strong>: {team.pokemon.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;