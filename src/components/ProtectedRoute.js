// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = auth.currentUser;

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;