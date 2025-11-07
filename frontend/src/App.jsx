// src/App.jsx
import { Routes, Route,Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ruta Privada */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        } 
      />
      
      {/* (Opcional) Ruta "Catch-all" por si se pierden */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;