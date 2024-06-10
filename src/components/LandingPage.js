// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to the Nuzlocke Tracker!</h2>
      <p>Log in or sign up to start tracking your Nuzlocke runs!</p>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default LandingPage;