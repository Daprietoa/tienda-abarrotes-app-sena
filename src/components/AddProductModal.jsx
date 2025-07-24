import React, { useState } from 'react';
import './AddProductModal.css';

function AddProductModal({ onClose, onProductoAgregado }) {
  const [nombre, setNombre] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');

  const handleGuardar = async () => {
    const nuevoProducto = {
      nombre_producto: nombre,
      precio_compra: parseFloat(precioCompra),
      precio_venta: parseFloat(precioVenta),
      stock: parseInt(stock),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/product/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Producto guardado con éxito");
        onClose(); // Cierra el modal
        onProductoAgregado(); // ✅ Recarga productos sin salir del dashboard
      } else {
        console.error("Respuesta del backend:", data);
        alert("Error al guardar producto: " + (data.message || "Respuesta inesperada"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar el producto");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>Añadir Producto</h3>
        <form>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="number" placeholder="Precio Compra" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)} required />
          <input type="number" placeholder="Precio Venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} required />
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <div className="modal-botones">
            <button type="button" onClick={handleGuardar} className="btn-guardar">Guardar</button>
            <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
