import React, { useState } from "react";
import axios from "axios";
import "./styles/turnos.css"; // Reutilizamos los estilos de turnos
const apiUrl = import.meta.env.VITE_API_URL;

const MaterialRequestBlock = ({ configuration }) => {
  const containerStyle = {
    backgroundColor: configuration.backgroundColor || "#ffffff",
  };

  const sideImage = configuration.sideImage;

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    material: "",
    conocio: "",
    consentimiento: false,
  });

  const [showInfo, setShowInfo] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}api/turnos/materiales`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          material: "",
          conocio: "",
          consentimiento: false,
        });
        setShowSuccessModal(true);
      } else {
        alert("Error al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario.");
    }
  };

  return (
    <div className="container-turnos"  id="formulario-materiales">
      <div className="image-section">
        <img src={sideImage} alt="Imagen del costado" className="image" />
        <div className="cuadrantedeplazo">
          <p>
            Los profesionales se pondrán en contacto en un plazo de 24 horas laborales por medio del whatsapp y correo electrónico que has completado en el formulario.
          </p>
        </div>
      </div>
      <div className="form-section">
        <p className="image-text">Formulario de solicitud de material</p>
        <form onSubmit={handleSubmit} className="form-terapia">
          <div className="grid-terapia">
            <div>
              <p>Nombre</p>
              <input
                className="input"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Apellido</p>
              <input
                className="input"
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Teléfono</p>
              <input
                className="input"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Correo Electrónico</p>
              <input
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Material de auto-ayuda</p>
              <select
                className="input"
                name="material"
                value={formData.material}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un material</option>
                <option value="Transitando la Pérdida">Transitando la Pérdida</option>
                <option value="Autoestima">Autoestima</option>
              </select>
            </div>
          </div>

          <div className="options">
            <p>¿Dónde nos conociste?</p>
            <label>
              <input
                type="radio"
                name="conocio"
                value="Instagram"
                onChange={handleChange}
                required
              />{" "}
              Instagram
            </label>
            <label>
              <input
                type="radio"
                name="conocio"
                value="Google"
                onChange={handleChange}
                required
              />{" "}
              Google
            </label>
            <label>
              <input
                type="radio"
                name="conocio"
                value="Recomendación"
                onChange={handleChange}
                required
              />{" "}
              Recomendación
            </label>
            <label>
              <input
                type="radio"
                name="conocio"
                value="Otro"
                onChange={handleChange}
                required
              />{" "}
              Otro
            </label>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              required
            />{" "}
            <span>
              Estoy de acuerdo con la política de privacidad
            </span>
          </div>

          <button type="submit" className="button">
            Enviar
          </button>

          <div className="data-protection">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowInfo(!showInfo);
              }}
            >
              {showInfo
                ? "Ocultar información ↑"
                : "Leer información sobre protección de datos ↓"}
            </a>
            {showInfo && (
              <p>
                Mantis Espacio Terapéutico utilizará los datos que envíe bajo su consentimiento, con la finalidad de contactarse con usted para coordinar una sesión y/o brindarle información sobre cualquier consulta en relación a los servicios que se ofrecen en este sitio web.
                Los datos compartidos se conservarán durante el tiempo necesario mientras se mantenga la relación comercial para cumplir con las obligaciones que responden a la finalidad del servicio ofrecido.
              </p>
            )}
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <p>
              Los profesionales se pondrán en contacto en un plazo de 24 horas laborales por medio del whatsapp y correo electrónico que has completado en el formulario.
            </p>
            <button onClick={() => setShowSuccessModal(false)} className="close-modal">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialRequestBlock;