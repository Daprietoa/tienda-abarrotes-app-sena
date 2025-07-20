import React from "react";
import "./ProviderList.css";

const ProviderList = ({ providers }) => {
  return (
    <div className="provider-container">
      <h2>Gestión de Proveedores</h2>
      <input type="text" placeholder="Buscar proveedor" className="search-input" />

      <table className="provider-table">
        <thead>
          <tr>
            <th>ID Proveedor</th>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.id}</td>
              <td>{prov.nombre}</td>
              <td>{prov.empresa}</td>
              <td>{prov.telefono}</td>
              <td>{prov.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button className="btn add">Añadir nuevo</button>
        <button className="btn edit">Editar</button>
        <button className="btn delete">Eliminar</button>
        <button className="btn view">Ver detalle</button>
      </div>
    </div>
  );
};

export default ProviderList;
