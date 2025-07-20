import React from 'react';
import Sidebar from '../components/Sidebar';
import './Reports.css';

const Reports = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h1>Menú de Reportes</h1>
        <div className="report-buttons">
          <button>Estadísticas Generales</button>
          <button>Productos Más Vendidos</button>
          <button>Productos Menos Vendidos</button>
          <button>Clientes Destacados</button>
          <button>Reporte de Utilidades</button>
        </div>
      </main>
    </div>
  );
};

export default Reports;
