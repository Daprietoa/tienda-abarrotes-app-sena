import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onAdd, onEdit, onDelete, onView }) => {
  return (
    <div className="product-list">
      <h2>Gestión de Productos</h2>
      <input
        type="text"
        placeholder="Buscar producto"
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>${prod.precioCompra}</td>
              <td>${prod.precioVenta}</td>
              <td>${prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="product-buttons">
        <button className="btn btn-green" onClick={onAdd}>Añadir nuevo</button>
        <button className="btn btn-blue" onClick={onEdit}>Editar</button>
        <button className="btn btn-red" onClick={onDelete}>Eliminar</button>
        <button className="btn btn-gray" onClick={onView}>Ver detalle</button>
      </div>
    </div>
  );
};

export default ProductList;
