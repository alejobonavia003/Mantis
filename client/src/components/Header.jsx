import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const [contenidos, setContenidos] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // Estado para el menú móvil
  const [menuOpen, setMenuOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const menuRef = useRef(null);

  useEffect(() => {
    axios
      .get(apiUrl + "api/contenidos/")
      .then((res) => {
        const contenidosObj = res.data.reduce((acc, contenido) => {
          acc[contenido.clave] = contenido.valor;
          return acc;
        }, {});
        setContenidos(contenidosObj);
      })
      .catch((err) => console.error("Error al obtener configuración:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
  
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  

  // Lógica del header desktop (hover dropdowns)
  const handleMouseEnter = (menu) => {
    setDropdownVisible(menu);
  };

  const handleMouseLeave = useCallback((e) => {
    // Verifica si el mouse aún está en el área del dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdownVisible(null);
    }
  }, []);

  const handleDropdownClick = (menu, event) => {
    if (dropdownVisible !== menu) {
      event.preventDefault();
      setDropdownVisible(menu);
    }
  };

  // Lógica para el header móvil (abrir/cerrar menú lateral)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* HEADER PARA ESCRITORIO */}
      <header className="headerDesktop">
        <div className="logoContainer">
          <Link to="/" className="logoLink">
            <img src={contenidos.header_logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="navContainer">
          <ul className="navList">
            <li className="navItem">
              <Link to="/" className="navLink">
                Inicio
              </Link>
            </li>
            <li
              className="navItem headerDropdown"
              onMouseEnter={() => handleMouseEnter("profesionales")}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleDropdownClick("profesionales", e)}
            >
              <Link to="/nosotros" className="navLink">
                Profesionales   
              </Link>
              {dropdownVisible === "profesionales" && (
                <ul className="dropdown">
                  <li className="dropdownItem">
                    <Link to="/rol-del-terapeuta" className="dropdownLink">
                      Rol del Terapeuta
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="navItem headerDropdown"
              onMouseEnter={() => handleMouseEnter("terapia")}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleDropdownClick("terapia", e)}
            >
              <Link to="/turnos" className="navLink">
                Terapia Online
              </Link>
              {dropdownVisible === "terapia" && (
                <ul className="dropdown">
                  <li className="dropdownItem">
                    <Link to="/turnos#formulario-de-turnos" className="dropdownLink">
                      Solicitar una Sesión
                    </Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="/rol-del-terapeuta" className="dropdownLink">
                      Rol del Terapeuta
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="navItem headerDropdown"
              onMouseEnter={() => handleMouseEnter("materiales")}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleDropdownClick("materiales", e)}
            >
              <Link to="/cuadernillos" className="navLink">
                Nuestros Materiales
              </Link>
              {dropdownVisible === "materiales" && (
                <ul className="dropdown">
                  <li className="dropdownItem">
                    <Link to="/cuadernillos#formulario-materiales" className="dropdownLink">
                      Hacer el Pedido
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="navItem">
              <Link to="/admin" className="navLink">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="userIcon"
                  width="24"
                  height="24"
                >
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* HEADER PARA MÓVILES Y TABLET */}
      <header className="headerMobile">
        <div className="mobileLeft">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={contenidos.header_logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="mobileRight">
          <Link to="/admin" className="adminLink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="userIcon"
              width="24"
              height="24"
            >
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z" />
              </svg>
          </Link>
          <button className="hamburger" onClick={toggleMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>

        {/* Menú deslizable desde la derecha */}
        <nav ref={menuRef} className={`slideMenu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={() => setMenuOpen(false)}>
                Profesionales
              </Link>
            </li>
            <li>
              <Link to="/turnos" onClick={() => setMenuOpen(false)}>
                Terapia Online
              </Link>
            </li>
            <li>
              <Link to="/cuadernillos" onClick={() => setMenuOpen(false)}>
                Nuestros Materiales
              </Link>
            </li>
            <li>
              <Link to="/cuadernillos#formulario-materiales" onClick={() => setMenuOpen(false)}>
                Hacer el Pedido
              </Link>
            </li>
            <li>
              <Link to="/turnos#formulario-de-turnos" onClick={() => setMenuOpen(false)}>
                Solicitar una Sesión
              </Link>
            </li>
            <li>
              <Link to="/rol-del-terapeuta" onClick={() => setMenuOpen(false)}>
                Rol del Terapeuta
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;