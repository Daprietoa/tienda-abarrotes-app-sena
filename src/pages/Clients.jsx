import React from "react";
import ClientList from "../components/ClientList";
import Sidebar from "../components/Sidebar";

function Clients() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <ClientList />
      </div>
    </div>
  );
}

export default Clients;
