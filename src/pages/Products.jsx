import React from "react";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar"; // Asegúrate de que existe
import "../components/ProductList.css";



const Products = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <ProductList
          
          onAdd={() => alert("Agregar producto")}
          onEdit={() => alert("Editar producto")}
          onDelete={() => alert("Eliminar producto")}
          
        />
      </div>
    </div>
  );
};

export default Products;
