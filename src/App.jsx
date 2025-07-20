import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import DashboardLayout from './components/DashboardLayout'; // 👈 Importa el layout
import Reports from './pages/Reports';
import AddProduct from './pages/AddProduct';
import Providers from "./pages/Providers";
import Clients from './pages/Clients';
import Users from './pages/Users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'david' && password === '12345') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/dashboard/home" /> : <Login onLogin={handleLogin} />
      } />
      
      {/* Rutas protegidas con layout */}
      <Route path="/dashboard" element={
        isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />
      }>
        <Route path="home" element={<Home />} />
        <Route path="productos" element={<Products />} />
        <Route path="reportes" element= {<Reports />} />
        <Route path='agregar' element={<AddProduct />} />
        <Route path="proveedores" element={<Providers />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="usuarios" element={<Users />} />
        {/*  agregar más secciones como "clientes", "reportes", etc */}
      </Route>
    </Routes>
  );
}

export default App;
