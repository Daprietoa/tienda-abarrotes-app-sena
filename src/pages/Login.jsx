import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usuario, clave);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
