// src/components/TeamAnalysis.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getTypeEffectiveness = (pokemon) => {
  // Mock function for type effectiveness
  return {
    weaknesses: ['Fire', 'Flying'], // Example weaknesses
    coverage: ['Water', 'Electric'], // Example coverage
  };
};

const TeamAnalysis = () => {
  const [teams, setTeams] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams!', error);
      });
  }, []);

  const analyzeTeam = (team) => {
    const weaknesses = {};
    const coverage = {};

    team.pokemon.forEach(pokemon => {
      const { weaknesses: pWeaknesses, coverage: pCoverage } = getTypeEffectiveness(pokemon);

      pWeaknesses.forEach(type => {
        weaknesses[type] = (weaknesses[type] || 0) + 1;
      });

      pCoverage.forEach(type => {
        coverage[type] = (coverage[type] || 0) + 1;
      });
    });

    setAnalysis({ weaknesses, coverage });
  };

  return (
    <div>
      <h2>Team Analysis</h2>
      <h3>Teams</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index} onClick={() => analyzeTeam(team)}>
            {team.pokemon.join(', ')}
          </li>
        ))}
      </ul>
      {analysis && (
        <div>
          <h3>Analysis</h3>
          <div>
            <h4>Weaknesses</h4>
            <ul>
              {Object.entries(analysis.weaknesses).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Coverage</h4>
            <ul>
              {Object.entries(analysis.coverage).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAnalysis;