import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProviderList from "../components/ProviderList";

const dummyData = [
  { id: 1, nombre: "Juan", empresa: "Abarrotes S.A.", telefono: "123-4578", ciudad: "Barranquilla" },
  { id: 2, nombre: "María", empresa: "Carter Logistics LLC", telefono: "123-4567", ciudad: "Barranquilla" },
  { id: 3, nombre: "Pedro", empresa: "Jiménez Distribuciones", telefono: "525-6747", ciudad: "Barranquilla" },
  { id: 4, nombre: "Ana", empresa: "Rico Suave Ltda.", telefono: "123-4667", ciudad: "Barranquilla" },
];

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    // Aquí luego llamaremos al backend con fetch o axios
    setProviders(dummyData);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem" }}>
        <ProviderList providers={providers} />
      </div>
    </div>
  );
};

export default Providers;
