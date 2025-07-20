import React from "react";
import "./UserList.css";

const UserList = () => {
  const usuarios = [
    { id: 1, nombre: "Carlos", correo: "carlos@mail.com", rol: "Admin", estado: "Activo" },
    { id: 2, nombre: "Lucía", correo: "lucia@mail.com", rol: "Usuario", estado: "Inactivo" },
    { id: 3, nombre: "Andrés", correo: "andres@mail.com", rol: "Usuario", estado: "Activo" },
  ];

  return (
    <div className="user-list-container">
      <h2>Gestión de Usuarios</h2>
      <input type="text" placeholder="Buscar usuario..." className="search-input" />

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.rol}</td>
              <td>{user.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="user-buttons">
        <button className="btn-green">Añadir nuevo</button>
        <button className="btn-blue">Editar</button>
        <button className="btn-red">Eliminar</button>
        <button className="btn-gray">Ver detalle</button>
      </div>
    </div>
  );
};

export default UserList;
