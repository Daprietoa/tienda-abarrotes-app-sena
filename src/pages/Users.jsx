import React from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import "./Products.css"; // Usamos el estilo de layout compartido

const Users = () => {
  return (<div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <UserList />
      </div>
    </div>
  );
};

export default Users;
