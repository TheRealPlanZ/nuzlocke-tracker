// src/components/Teams.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = {
      name,
      pokemon: pokemon.split(','),
    };

    axios.post('http://localhost:5000/teams/add', newTeam)
      .then(response => {
        setTeams([...teams, response.data]);
        setName('');
        setPokemon('');
      })
      .catch(error => {
        console.error('There was an error adding the team!', error);
      });
  };

  return (
    <div>
      <h2>Teams</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Pokemon (comma separated):</label>
          <input type="text" value={pokemon} onChange={(e) => setPokemon(e.target.value)} required />
        </div>
        <button type="submit">Add Team</button>
      </form>
      <h3>Team List</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            <strong>{team.name}</strong>: {team.pokemon.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;