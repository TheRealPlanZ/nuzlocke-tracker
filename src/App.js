// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Encounters from './components/Encounters';
import GymFights from './components/GymFights';
import Teams from './components/Teams';
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
          <ProtectedRoute path="/" element={<Dashboard />} />
          <ProtectedRoute path="/encounters" element={<Encounters />} />
          <ProtectedRoute path="/gymfights" element={<GymFights />} />
          <ProtectedRoute path="/teams" element={<Teams />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;