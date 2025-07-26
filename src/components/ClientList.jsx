import React, { useEffect, useState } from "react";
import "./ClientList.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";

// Hook personalizado para evitar múltiples llamadas durante la escritura rápida
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ClientList() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarAddModal, setMostrarAddModal] = useState(false);
  const [mostrarEditModal, setMostrarEditModal] = useState(false);
  const [clienteEditar, setClienteEditar] = useState(null);

  const clientesPorPagina = 5;
  const debouncedBusqueda = useDebounce(busqueda, 300);

  const cargarClientes = (termino = "") => {
    const url = termino
      ? `http://127.0.0.1:8000/client/search?nombre=${encodeURIComponent(termino)}`
      : "http://127.0.0.1:8000/client/get-clients";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const clientes = Array.isArray(data.data) ? data.data : [];
        setClientes(clientes);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarClientes(debouncedBusqueda);
  }, [debouncedBusqueda]);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;
    const res = await fetch(`http://127.0.0.1:8000/client/delete-client/${id}`, { method: "DELETE" });
    if (res.ok) cargarClientes(busqueda);
  };

  const handleEditar = (cliente) => {
    setClienteEditar(cliente);
    setMostrarEditModal(true);
  };

  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
  const indiceInicio = (paginaActual - 1) * clientesPorPagina;
  const clientesEnPagina = clientes.slice(indiceInicio, indiceInicio + clientesPorPagina);

  if (cargando) return <p className="loading">Cargando clientes...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="client-container">
      <h2>Gestión de Clientes</h2>

      <div className="barra-superior">
        <div className="buscador">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar cliente por nombre..."
            value={busqueda}
            onChange={handleSearch}
          />
        </div>
        <button className="btn-agregar" onClick={() => setMostrarAddModal(true)}>
          <FaPlus /> Añadir
        </button>
      </div>

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Cédula</th>
            <th>Deuda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesEnPagina.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nombre}</td>
              <td>{c.telefono}</td>
              <td>{c.direccion}</td>
              <td>{c.cedula}</td>
              <td>${c.deuda}</td>
              <td className="acciones">
                <button className="btn-editar" onClick={() => handleEditar(c)}><FaEdit /></button>
                <button className="btn-eliminar" onClick={() => handleEliminar(c.id_cliente)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
          Siguiente
        </button>
      </div>

      {mostrarAddModal && (
        <AddClientModal
          onClose={() => setMostrarAddModal(false)}
          onClienteAgregado={() => cargarClientes(busqueda)}
        />
      )}

      {mostrarEditModal && clienteEditar && (
        <EditClientModal
          cliente={clienteEditar}
          onClose={() => {
            setMostrarEditModal(false);
            setClienteEditar(null);
          }}
          onClienteActualizado={() => cargarClientes(busqueda)}
        />
      )}
    </div>
  );
}

export default ClientList;
