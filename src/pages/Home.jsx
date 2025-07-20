import React from "react";
import Sidebar from "../components/Sidebar"; // asegúrate que el path esté correcto
import "./Home.css"; // si deseas aplicarle estilos personalizados

const Home = () => {
  // Simulación de datos del usuario (luego puede venir del backend o context)
  const usuario = {
    nombre: "David Prieto",
    correo: "davidprieto@example.com",
    rol: "Administrador"
  };

  return (
    <div className="home-container">
      <Sidebar />

      <div className="home-main">
        <div className="user-card">
          <h2>¡Bienvenido, {usuario.nombre}!</h2>
          <p>📧 Correo: {usuario.correo}</p>
          <p>🔐 Rol: {usuario.rol}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
