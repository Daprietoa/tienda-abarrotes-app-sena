import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = { nombre, precio, stock };
    onAgregar(nuevoProducto);
    setNombre('');
    setPrecio('');
    setStock('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Registrar Producto</h2>
      <label>Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <label>Precio:
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </label>
      <label>Stock:
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default ProductForm;
