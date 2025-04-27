import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState(''); // Estado para el usuario (sin funcionalidad)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Obtiene la URL base de la API desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activa el estado de carga

    try {
      const response = await axios.post(apiUrl + 'api/auth/login', { password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin');
        window.location.reload();
      }
    } catch (error) {
      setError('Credenciales inválidas');
      setPassword('');
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Iniciar Sesion</h2>

        {/* Casilla de usuario */}
        <div className="inputGroup">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            disabled={isLoading}
          />
        </div>

        {/* Casilla de contraseña */}
        <div className="inputGroup">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            disabled={isLoading}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          className="button"
          disabled={!password || isLoading}
        >
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;