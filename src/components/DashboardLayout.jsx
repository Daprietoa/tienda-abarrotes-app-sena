
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../pages/Dashboard.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      
      <main className="main-content">
        <Outlet /> {/* Aquí se cargan dinámicamente Home, Products, etc. */}
      </main>
    </div>
  );
};

export default DashboardLayout;
