import React from 'react';
import { Navigate } from 'react-router-dom';

// Fungsi ini harus disesuaikan untuk memeriksa status login pengguna
const isAuthenticated = () => {
  // Misalnya, memeriksa token di localStorage
  return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
