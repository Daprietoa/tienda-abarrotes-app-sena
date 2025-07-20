 import React, { useState } from 'react';

   const AddProduct = () => {
     const [nombre, setNombre] = useState('');
     const [precio, setPrecio] = useState('');

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log('Producto:', nombre, precio);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
         <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
         <button type="submit">Agregar</button>
       </form>
     );
   };

   export default AddProduct;