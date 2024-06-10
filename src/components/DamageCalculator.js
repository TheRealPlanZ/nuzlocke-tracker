// src/components/DamageCalculator.js
import React, { useState } from 'react';
import { Generations, calculate } from '@smogon/calc';
import { Pokemon, Move } from '@smogon/calc';

const DamageCalculator = () => {
  const [attacker, setAttacker] = useState('');
  const [defender, setDefender] = useState('');
  const [move, setMove] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const gens = new Generations();
    const atk = new Pokemon(gens.get(8), attacker);
    const def = new Pokemon(gens.get(8), defender);
    const mv = new Move(gens.get(8), move);

    const res = calculate(gens.get(8), atk, def, mv);
    setResult(res);
  };

  return (
    <div>
      <h2>Damage Calculator</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
        <div>
          <label>Attacker:</label>
          <input type="text" value={attacker} onChange={(e) => setAttacker(e.target.value)} required />
        </div>
        <div>
          <label>Defender:</label>
          <input type="text" value={defender} onChange={(e) => setDefender(e.target.value)} required />
        </div>
        <div>
          <label>Move:</label>
          <input type="text" value={move} onChange={(e) => setMove(e.target.value)} required />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h3>Result</h3>
          <p>Damage: {result.damage.join(' - ')}</p>
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;