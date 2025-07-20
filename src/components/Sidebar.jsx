import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () =>{
    return(
        
        <aside className='sidebar'>
            <div className='logo'>Dashboard</div>
            <nav>
                <ul>
                    <li><Link to ="/dashboard/home">Inicio</Link></li>
                    <li><Link to ="/dashboard/proveedores">Proveedores</Link></li>
                    <li><Link to ="/dashboard/productos">Productos</Link></li>
                    <li><Link to ="#">Venta</Link></li>
                    <li><Link to ="/dashboard/clientes">Clientes</Link></li>
                    <li><Link to = '/dashboard/reportes'>Reportes</Link></li>
                    <li><Link to = '/dashboard/usuarios'>Administración de usuarios</Link></li>

                </ul>
            </nav>

        </aside>
    );
};

export default Sidebar;