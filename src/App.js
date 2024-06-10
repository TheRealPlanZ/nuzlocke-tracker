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
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/encounters" element={user ? <Encounters /> : <Navigate to="/login" />} />
          <Route path="/gymfights" element={user ? <GymFights /> : <Navigate to="/login" />} />
          <Route path="/teams" element={user ? <Teams /> : <Navigate to="/login" />} />
          <Route path="/damage-calculator" element={user ? <DamageCalculator /> : <Navigate to="/login" />} />
          <Route path="/team-analysis" element={user ? <TeamAnalysis /> : <Navigate to="/login" />} />
          <Route path="/battle-history" element={user ? <BattleHistory /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;