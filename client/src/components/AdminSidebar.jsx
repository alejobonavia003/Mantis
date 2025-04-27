import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebarTitle">Panel de Administración</h2>
      <ul className="sidebarList">
        <li
          className={`sidebarItem ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Productos
        </li>
        <li
          className={`sidebarItem ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Registro de psicólogos
        </li>
        <li
          className={`sidebarItem ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Galería
        </li>
        <li
          className={`sidebarItem ${activeTab === "inicio" ? "active" : ""}`}
          onClick={() => setActiveTab("inicio")}
        >
          página de inicio
        </li>
        <li
          className={`sidebarItem ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          Pagina de Profesionales 
        </li>
        <li
          className={`sidebarItem ${activeTab === "cuadernillos" ? "active" : ""}`}
          onClick={() => setActiveTab("cuadernillos")}
        >
          Pagina de Materiales
        </li>
        <li
          className={`sidebarItem ${activeTab === "turnos" ? "active" : ""}`}
          onClick={() => setActiveTab("turnos")}
        >
          Formulario de Terapia
        </li>
        <li
          className={`sidebarItem ${activeTab === "rol-del-terapeuta" ? "active" : ""}`}
          onClick={() => setActiveTab("rol-del-terapeuta")}
        >
          Rol del terapeuta
        </li>
        <li
          className={`sidebarItem ${activeTab === "mantenimientos" ? "active" : ""}`}
          onClick={() => setActiveTab("mantenimientos")}
        >
          Mantenimiento
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;