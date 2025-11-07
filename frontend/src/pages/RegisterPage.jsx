// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { register } from '../services/authApi';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(username, password);
      // Éxito, manda al usuario a la página de Login
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="todo-form">
        <h3>Registro</h3>
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
        <button type="submit">Crear Cuenta</button>
        {error && <p className="error-message">{error}</p>}
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
      </form>
    </div>
  );
}
export default RegisterPage;