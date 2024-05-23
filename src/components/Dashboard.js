// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;