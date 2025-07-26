import React, { useState } from "react";
import "./AddClientModal.css";

const AddClientModal = ({ onClose, onClienteAgregado }) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    cedula: "",
    deuda: "",
    estado: "activo" // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/client/create-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          direccion: cliente.direccion,
          cedula: cliente.cedula,
          deuda: parseInt(cliente.deuda) || 0,
          estado: cliente.estado
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Cliente añadido exitosamente");
        onClienteAgregado();
        onClose();
      } else {
        console.error("Error al guardar cliente:", data);
        alert("Error al añadir cliente: " + (data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al añadir cliente");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Añadir Cliente</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <input type="text" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleChange} />
          <input type="text" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleChange} />
          <input type="text" name="direccion" placeholder="Dirección" value={cliente.direccion} onChange={handleChange} />
          <input type="text" name="cedula" placeholder="Cédula" value={cliente.cedula} onChange={handleChange} />
          <input type="number" name="deuda" placeholder="Deuda" value={cliente.deuda} onChange={handleChange} />

          <div className="botones-accion">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
