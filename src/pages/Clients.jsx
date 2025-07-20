import React from "react";
import Sidebar from "../components/Sidebar";
import ClientList from "../components/ClientList";


function Clients() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <ClientList />
      </div>
    </div>
  );
}

export default Clients;
