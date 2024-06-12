// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Encounters from './components/Encounters';
import GymFights from './components/GymFights';
import Teams from './components/Teams';
import DamageCalculator from './components/DamageCalculator';
import TeamAnalysis from './components/TeamAnalysis';
import BattleHistory from './components/BattleHistory';
import LandingPage from './components/LandingPage';
import GameSelection from './components/GameSelection';
import Layout from './components/Layout';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
          <Route path="/game-selection" element={user ? <Layout><GameSelection /></Layout> : <Navigate to="/login" />} />
          <Route path="/encounters" element={user ? <Layout><Encounters /></Layout> : <Navigate to="/login" />} />
          <Route path="/gymfights" element={user ? <Layout><GymFights /></Layout> : <Navigate to="/login" />} />
          <Route path="/teams" element={user ? <Layout><Teams /></Layout> : <Navigate to="/login" />} />
          <Route path="/damage-calculator" element={user ? <Layout><DamageCalculator /></Layout> : <Navigate to="/login" />} />
          <Route path="/team-analysis" element={user ? <Layout><TeamAnalysis /></Layout> : <Navigate to="/login" />} />
          <Route path="/battle-history" element={user ? <Layout><BattleHistory /></Layout> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;