import React from "react";
import "./ClientList.css";

function ClientList() {
  const clients = [
    { id: 1, nombre: "Carlos Pérez", telefono: "123-4567", direccion: "Calle 10", cedula: "1000123456", estado: "Activo" },
    { id: 2, nombre: "María Torres", telefono: "555-1234", direccion: "Carrera 7", cedula: "1000987654", estado: "Inactivo" },
    { id: 3, nombre: "Luis Gómez", telefono: "321-4567", direccion: "Av. 1", cedula: "1000567890", estado: "Activo" },
  ];

  return (
    <div className="client-container">
      <h2>Gestión de Clientes</h2>
      <input className="search-client" type="text" placeholder="Buscar cliente" />

      <table className="client-table">
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Cédula</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nombre}</td>
              <td>{client.telefono}</td>
              <td>{client.direccion}</td>
              <td>{client.cedula}</td>
              <td>{client.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="btn-green">Añadir nuevo</button>
        <button className="btn-blue">Editar</button>
        <button className="btn-red">Eliminar</button>
        <button className="btn-gray">Ver detalle</button>
      </div>
    </div>
  );
}

export default ClientList;
