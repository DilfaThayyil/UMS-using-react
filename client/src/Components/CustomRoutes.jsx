/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Function to check if the user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const isAdmin=()=>{
  return !!localStorage.getItem('admintoken')
}
// ProtectedRoute component
const ProtectedRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

// PublicRoute component
const PublicRoute = ({ element: Element, ...rest }) => {
  return !isAuthenticated() ? <Element {...rest} /> : <Navigate to="/" />;
};

const AdminPublicRoute = ({ element: Element, ...rest }) => {
  return !isAdmin() ? <Element {...rest} /> : <Navigate to="/admin" />;
};

const AdminProtectedRoute = ({ element: Element, ...rest }) => {
  return isAdmin() ? <Element {...rest} /> : <Navigate to="/adminlogin" />;
};


// eslint-disable-next-line react-refresh/only-export-components
export { ProtectedRoute, PublicRoute,AdminProtectedRoute,AdminPublicRoute};
