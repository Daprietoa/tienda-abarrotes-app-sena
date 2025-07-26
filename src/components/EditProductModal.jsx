import React, { useState, useEffect } from 'react';
import './AddProductModal.css'; // 

function EditProductModal({ producto, onClose, onProductoActualizado }) {
  const [nombre, setNombre] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre_producto);
      setPrecioCompra(producto.precio_compra);
      setPrecioVenta(producto.precio_venta);
      setStock(producto.stock);
    }
  }, [producto]);

  const handleActualizar = async () => {
    const productoActualizado = {
      nombre_producto: nombre,
      precio_compra: parseFloat(precioCompra),
      precio_venta: parseFloat(precioVenta),
      stock: parseInt(stock)
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/product/change-product/${producto.id_producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoActualizado)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Producto actualizado con éxito');
        onProductoActualizado(); // Refrescar la lista
        onClose();
      } else {
        alert('Error al actualizar producto: ' + (data.message || 'Respuesta inesperada'));
      }
    } catch (error) {
      alert('Ocurrió un error al actualizar el producto');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>Editar Producto</h3>
        <form>
          <label htmlFor="nombre_producto">Nombre producto</label>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <label htmlFor="precio_compra">Precio compra</label>
          <input type="number" placeholder="Precio Compra" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)} required />
          <label htmlFor="precio_venta">Precio venta</label>
          <input type="number" placeholder="Precio Venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} required />
          <label htmlFor="stock">Stock</label>
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <div className="modal-botones">
            <button type="button" onClick={handleActualizar} className="btn-guardar">Guardar</button>
            <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
