import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (roleRequired && decodedToken.role !== roleRequired) {
      // If user doesn't have the required role, redirect to home
      return <Navigate to="/" />;
    }

    return children; // Allow access if token and role match
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
