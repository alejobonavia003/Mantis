import React, { useState, useEffect } from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [showPageOptions, setShowPageOptions] = useState(false);

  useEffect(() => {
    if (!["inicio", "about", "cuadernillos", "turnos", "rol-del-terapeuta"].includes(activeTab)) {
      setShowPageOptions(false);
    }
  }, [activeTab]);

  return (
    <div className="sidebar">
      <h2 className="sidebarTitle">Panel de Administración</h2>
      <ul className="sidebarList">
        <li
          className={`sidebarItem ${activeTab === "mantenimientos" ? "active" : ""}`}
          onClick={() => setActiveTab("mantenimientos")}
        >
          Métricas
        </li>
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
          psicólogos
        </li>
        <li
          className={`sidebarItem ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Galería
        </li>
        <li
          className={`sidebarItem ${activeTab === "documentacion" ? "active" : ""}`}
          onClick={() => setActiveTab("documentacion")}
        >
          Documentación
        </li>
        <li
          className={`sidebarItem ${showPageOptions ? "active" : ""}`}
          onClick={() => setShowPageOptions(!showPageOptions)}
        >
          Edición de Página
        </li>
      </ul>
      <div>
        {showPageOptions && (
          <ul className="sidebarSubList">
            <li
              className={`sidebarItem ${activeTab === "inicio" ? "active" : ""}`}
              onClick={() => setActiveTab("inicio")}
            >
              Página de Inicio
            </li>
            <li
              className={`sidebarItem ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              Página de Profesionales
            </li>
            <li
              className={`sidebarItem ${activeTab === "cuadernillos" ? "active" : ""}`}
              onClick={() => setActiveTab("cuadernillos")}
            >
              Página de Materiales
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
              Rol del Terapeuta
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
