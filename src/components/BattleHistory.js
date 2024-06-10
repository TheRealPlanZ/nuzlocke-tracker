// src/components/BattleHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BattleHistory = () => {
  const [battleHistories, setBattleHistories] = useState([]);
  const [battleType, setBattleType] = useState('');
  const [opponent, setOpponent] = useState('');
  const [userTeam, setUserTeam] = useState('');
  const [opponentTeam, setOpponentTeam] = useState('');
  const [result, setResult] = useState('');
  const [turns, setTurns] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/battlehistories')
      .then(response => {
        setBattleHistories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the battle histories!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBattleHistory = {
      battleType,
      opponent,
      userTeam: userTeam.split(','),
      opponentTeam: opponentTeam.split(','),
      result,
      turns: turns.split(';').map(turn => {
        const [move, outcome] = turn.split(':');
        return { move, outcome };
      }),
    };

    axios.post('http://localhost:5000/battlehistories/add', newBattleHistory)
      .then(response => {
        setBattleHistories([...battleHistories, response.data]);
        setBattleType('');
        setOpponent('');
        setUserTeam('');
        setOpponentTeam('');
        setResult('');
        setTurns('');
      })
      .catch(error => {
        console.error('There was an error adding the battle history!', error);
      });
  };

  return (
    <div>
      <h2>Battle History</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Battle Type:</label>
          <input type="text" value={battleType} onChange={(e) => setBattleType(e.target.value)} required />
        </div>
        <div>
          <label>Opponent:</label>
          <input type="text" value={opponent} onChange={(e) => setOpponent(e.target.value)} required />
        </div>
        <div>
          <label>User Team (comma separated):</label>
          <input type="text" value={userTeam} onChange={(e) => setUserTeam(e.target.value)} required />
        </div>
        <div>
          <label>Opponent Team (comma separated):</label>
          <input type="text" value={opponentTeam} onChange={(e) => setOpponentTeam(e.target.value)} required />
        </div>
        <div>
          <label>Result:</label>
          <input type="text" value={result} onChange={(e) => setResult(e.target.value)} required />
        </div>
        <div>
          <label>Turns (move:outcome, separated by semicolons):</label>
          <input type="text" value={turns} onChange={(e) => setTurns(e.target.value)} required />
        </div>
        <button type="submit">Add Battle History</button>
      </form>
      <h3>Battle History List</h3>
      <ul>
        {battleHistories.map(battle => (
          <li key={battle._id}>
            {battle.battleType} - {battle.opponent} (User Team: {battle.userTeam.join(', ')}, Opponent Team: {battle.opponentTeam.join(', ')}, Result: {battle.result}, Turns: {battle.turns.map(turn => `${turn.move}: ${turn.outcome}`).join(', ')})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattleHistory;