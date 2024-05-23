// src/components/Encounters.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Encounters = () => {
  const [encounters, setEncounters] = useState([]);
  const [route, setRoute] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [level, setLevel] = useState('');
  const [nature, setNature] = useState('');
  const [ability, setAbility] = useState('');
  const [moves, setMoves] = useState('');
  const [status, setStatus] = useState('caught');

  useEffect(() => {
    axios.get('http://localhost:5000/encounters')
      .then(response => {
        setEncounters(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the encounters!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEncounter = {
      route,
      pokemon,
      level,
      nature,
      ability,
      moves: moves.split(','),
      status,
    };

    axios.post('http://localhost:5000/encounters/add', newEncounter)
      .then(response => {
        setEncounters([...encounters, response.data]);
        setRoute('');
        setPokemon('');
        setLevel('');
        setNature('');
        setAbility('');
        setMoves('');
        setStatus('caught');
      })
      .catch(error => {
        console.error('There was an error adding the encounter!', error);
      });
  };

  return (
    <div>
      <h2>Encounters</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Route:</label>
          <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} required />
        </div>
        <div>
          <label>Pokemon:</label>
          <input type="text" value={pokemon} onChange={(e) => setPokemon(e.target.value)} required />
        </div>
        <div>
          <label>Level:</label>
          <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} required />
        </div>
        <div>
          <label>Nature:</label>
          <input type="text" value={nature} onChange={(e) => setNature(e.target.value)} required />
        </div>
        <div>
          <label>Ability:</label>
          <input type="text" value={ability} onChange={(e) => setAbility(e.target.value)} required />
        </div>
        <div>
          <label>Moves (comma separated):</label>
          <input type="text" value={moves} onChange={(e) => setMoves(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="caught">Caught</option>
            <option value="fainted">Fainted</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>
        <button type="submit">Add Encounter</button>
      </form>
      <h3>Encounter List</h3>
      <ul>
        {encounters.map(encounter => (
          <li key={encounter._id}>
            {encounter.route} - {encounter.pokemon} (Level: {encounter.level}, Nature: {encounter.nature}, Ability: {encounter.ability}, Moves: {encounter.moves.join(', ')}, Status: {encounter.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Encounters;