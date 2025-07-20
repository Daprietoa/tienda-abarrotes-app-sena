import React from "react";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar"; // Asegúrate de que existe
import "../components/ProductList.css";

const dummyProducts = [
  { id: 1, nombre: "Arroz", precioCompra: 20, precioVenta: 30 ,stock:10},
  { id: 2, nombre: "Leche", precioCompra: 15, precioVenta: 25 ,stock:15},
  { id: 3, nombre: "Pan", precioCompra: 10, precioVenta: 20 ,stock:17},
  { id: 4, nombre: "Huevos", precioCompra: 5, precioVenta: 10 ,stock:2},
  { id: 5, nombre: "Café", precioCompra: 12, precioVenta: 18 ,stock:45},
];

const Products = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <ProductList
          products={dummyProducts}
          onAdd={() => alert("Agregar producto")}
          onEdit={() => alert("Editar producto")}
          onDelete={() => alert("Eliminar producto")}
          onView={() => alert("Ver detalle producto")}
        />
      </div>
    </div>
  );
};

export default Products;
