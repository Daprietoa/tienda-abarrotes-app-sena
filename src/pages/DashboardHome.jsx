
import React from 'react';

const DashboardHome = () => {
  return (
    <>
      <h1>Menú de Reportes</h1>
      <div className="report-buttons">
        <button>Estadísticas Generales</button>
        <button>Productos Más Vendidos</button>
        <button>Productos Menos Vendidos</button>
        <button>Clientes Destacados</button>
        <button>Reporte de Utilidades</button>
      </div>
    </>
  );
};

export default DashboardHome;
