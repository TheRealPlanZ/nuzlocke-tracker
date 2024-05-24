// src/components/GymFights.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GymFights = () => {
  const [gymFights, setGymFights] = useState([]);
  const [gymLeader, setGymLeader] = useState('');
  const [team, setTeam] = useState('');
  const [outcome, setOutcome] = useState('win');

  useEffect(() => {
    axios.get('http://localhost:5000/gymfights')
      .then(response => {
        setGymFights(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the gym fights!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGymFight = {
      gymLeader,
      team: team.split(','),
      outcome,
    };

    axios.post('http://localhost:5000/gymfights/add', newGymFight)
      .then(response => {
        setGymFights([...gymFights, response.data]);
        setGymLeader('');
        setTeam('');
        setOutcome('win');
      })
      .catch(error => {
        console.error('There was an error adding the gym fight!', error);
      });
  };

  return (
    <div>
      <h2>Gym Fights</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gym Leader:</label>
          <input type="text" value={gymLeader} onChange={(e) => setGymLeader(e.target.value)} required />
        </div>
        <div>
          <label>Team (comma separated):</label>
          <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} required />
        </div>
        <div>
          <label>Outcome:</label>
          <select value={outcome} onChange={(e) => setOutcome(e.target.value)} required>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
          </select>
        </div>
        <button type="submit">Add Gym Fight</button>
      </form>
      <h3>Gym Fight List</h3>
      <ul>
        {gymFights.map(fight => (
          <li key={fight._id}>
            {fight.gymLeader} - {fight.team.join(', ')} ({fight.outcome})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GymFights;