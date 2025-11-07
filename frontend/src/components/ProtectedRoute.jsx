// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, regresar al login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, deja que vea el contenido (children)
  return children;
}

export default ProtectedRoute;