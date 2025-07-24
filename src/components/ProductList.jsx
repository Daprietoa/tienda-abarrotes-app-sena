import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from "react-icons/fa";
import AddProductModal from '../components/AddProductModal';

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const productosPorPagina = 5;

  const cargarProductos = () => {
    fetch("http://127.0.0.1:8000/product/get-products")
      .then((res) => res.json())
      .then((data) => {
        const productos = Array.isArray(data.data) ? data.data : data;
        setProductos(productos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSearch = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/product/delete-product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Producto eliminado correctamente");
        cargarProductos(); // Recargar la lista
      } else {
        alert("Error al eliminar el producto: " + (data.message || "Respuesta inesperada"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar el producto");
    }
  };

  const productosFiltrados = productos.filter((p) =>
    (p.nombre_producto || p.nombre || "").toLowerCase().includes(busqueda)
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosEnPagina = productosFiltrados.slice(indiceInicio, indiceInicio + productosPorPagina);

  if (cargando) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="product-container">
      <h2>Gestión de Productos</h2>

      <div className="barra-superior">
        <div className="buscador">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={handleSearch}
          />
        </div>

        <button className="btn-agregar" onClick={() => setMostrarModal(true)}>
          <FaPlus /> Añadir Producto
        </button>
      </div>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosEnPagina.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nombre_producto || p.nombre}</td>
              <td>${p.precio_compra}</td>
              <td>${p.precio_venta}</td>
              <td>{p.stock || 0}</td>
              <td className="acciones">
                <button className="btn-ver"><FaEye /></button>
                <button className="btn-editar"><FaEdit /></button>
                <button className="btn-eliminar" onClick={() => handleEliminar(p.id_producto)}><FaTrash /></button>
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

      {mostrarModal && (
        <AddProductModal
          onClose={() => setMostrarModal(false)}
          onProductoAgregado={cargarProductos}
        />
      )}
    </div>
  );
}

export default ProductList;
