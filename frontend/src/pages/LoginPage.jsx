// src/pages/LoginPage.jsx
import { useState } from 'react';
import { login } from '../services/authApi';

import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 1. Llama a la API de login
      const response = await login(username, password);

      // 2. Guarda el token en el navegador
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      // 3. Redirige a la app principal
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="todo-form">
        <h3>Iniciar Sesión</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p className="error-message">{error}</p>}
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}
export default LoginPage;