import React, { useState } from "react";
import "./AddClientModal";

const EditClientModal = ({ cliente, onClose, onClienteActualizado }) => {
  const [clienteEditado, setClienteEditado] = useState({ ...cliente });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteEditado({ ...clienteEditado, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/client/update-client/${cliente.id_cliente}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: clienteEditado.nombre,
          telefono: clienteEditado.telefono,
          direccion: clienteEditado.direccion,
          cedula: clienteEditado.cedula,
          deuda: parseInt(clienteEditado.deuda) || 0,
        }),
      });

      if (response.ok) {
        onClienteActualizado();
        onClose();
      } else {
        const errorData = await response.json();
        alert("Error al actualizar cliente: " + JSON.stringify(errorData));
      }
    } catch (error) {
      alert("Error al actualizar cliente: " + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit} className="formulario">
            <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" placeholder="Nombre" value={clienteEditado.nombre} onChange={handleChange} />
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" name="telefono" placeholder="Teléfono" value={clienteEditado.telefono} onChange={handleChange} />
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" name="direccion" placeholder="Dirección" value={clienteEditado.direccion} onChange={handleChange} />
          <label htmlFor="cedula">Cedula:</label>
          <input type="text" name="cedula" placeholder="Cédula" value={clienteEditado.cedula} onChange={handleChange} />
          <label htmlFor="deuda">Deuda:</label>
          <input type="number" name="deuda" placeholder="Deuda" value={clienteEditado.deuda} onChange={handleChange} />

          <div className="botones-accion">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
