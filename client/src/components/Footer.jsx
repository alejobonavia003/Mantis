import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const location = useLocation(); // Hook para obtener la ruta actual
  const [contenidos, setContenidos] = useState([]); // Estado para almacenar el contenido

  // Obtiene la URL base de la API desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(apiUrl + "api/contenidos/")
      .then((res) => {
        // Transformar el array en un objeto
        const contenidosObj = res.data.reduce((acc, contenido) => {
          acc[contenido.clave] = contenido.valor;
          return acc;
        }, {});
        setContenidos(contenidosObj); // Guarda el objeto en el estado
      })
      .catch((err) => console.error("Error al obtener configuración:", err));
  }, []);

  return (
    <footer className="footer">
      <ul className="navList">
        <li className="navItem">
          <Link to="/" className="navLink">
            {contenidos.header_boton_inicio || "Inicio"}
          </Link>
        </li>
        <li className="navItem">
          <Link to="/nosotros" className="navLink">
            {contenidos.header_boton_nosotros || "Nosotras"}
          </Link>
        </li>
        <li className="navItem">
          <Link to="/cuadernillos" className="navLink">
            {contenidos.header_boton_tienda || "Cuadernillos"}
          </Link>
        </li>
        <li className="navItem">
          <Link to="/turnos" className="navLink">
            {contenidos.header_boton_turnos || "Turnos"}
          </Link>
        </li>
        <li className="navItem">
          <Link to="/admin" className="navLink">
            Admin
          </Link>
        </li>
      </ul>
      <p className="footerText">
        © 2025 Mantis, espacio terapéutico. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;