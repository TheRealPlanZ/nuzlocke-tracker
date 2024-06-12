// src/components/Layout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex`}>
      <nav className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-4">Nuzlocke Tracker</h1>
        <button onClick={toggleDarkMode} className="mb-4 p-2 bg-gray-700 rounded">
          Toggle Dark Mode
        </button>
        <ul>
          <li className="mb-2">
            <Link to="/game-selection" className="block p-2 bg-gray-700 rounded">Game Selection</Link>
          </li>
          <li className="mb-2">
            <Link to="/teams" className="block p-2 bg-gray-700 rounded">Team Management</Link>
          </li>
          <li className="mb-2">
            <Link to="/encounters" className="block p-2 bg-gray-700 rounded">Encounters</Link>
          </li>
          <li className="mb-2">
            <Link to="/gymfights" className="block p-2 bg-gray-700 rounded">Gym Fights</Link>
          </li>
          <li className="mb-2">
            <Link to="/damage-calculator" className="block p-2 bg-gray-700 rounded">Damage Calculator</Link>
          </li>
          <li className="mb-2">
            <Link to="/team-analysis" className="block p-2 bg-gray-700 rounded">Team Analysis</Link>
          </li>
          <li className="mb-2">
            <Link to="/battle-history" className="block p-2 bg-gray-700 rounded">Battle History</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;