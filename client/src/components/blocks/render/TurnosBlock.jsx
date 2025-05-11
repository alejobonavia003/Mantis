import React from "react";
import axios from "axios";
import "./styles/turnos.css"; // Archivo de estilos del bloque
const apiUrl = import.meta.env.VITE_API_URL;

const TurnosBlock = ({ configuration }) => {
  const containerStyle = {
    backgroundColor: configuration.backgroundColor || "#ffffff",
  };

  const sideImage = configuration.sideImage;

  const [formData, setFormData] = React.useState({
    nombre: "",
    apellidos: "",
    edad: "",
    telefono: "",
    email: "",
    residencia: "",
    disponibilidad: "",
    motivo: "",
    horario: "",
    tipoSesion: "",
    frecuencia: "",
    conocio: "",
    dudas: "",
  });

  const [showInfo, setShowInfo] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false); // Estado para controlar el modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}api/turnos`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setFormData({
          nombre: "",
          apellidos: "",
          edad: "",
          telefono: "",
          email: "",
          residencia: "",
          disponibilidad: "",
          motivo: "",
          horario: "",
          tipoSesion: "",
          frecuencia: "",
          conocio: "",
          dudas: "",
        });
        setShowSuccessModal(true); // Mostrar el modal de éxito

        // Registrar la solicitud de sesión en las métricas
        await axios.post(`${apiUrl}api/metrics/request`, {
          description: `Solicitud de sesión de ${formData.nombre} ${formData.apellidos}`,
        });
      } else {
        alert("Error al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario.");
    }
  };

  return (
    <div className="container-turnos" style={containerStyle} id="formulario-de-turnos">
      <div className="image-section">
        <img src={sideImage} alt="Imagen del costado" className="image" />
        <div className="cuadrantedeplazo">
          <p>
            Los profesionales se pondrán en contacto en un plazo de 24 horas laborales por medio del whatsapp y correo electrónico que has completado en el formulario.
          </p>
        </div>
      </div>
      <div className="form-section">
        <p className="image-text">Formulario de pre-sesión</p>
        <form onSubmit={handleSubmit} className="form-terapia">
          <div className="grid-terapia">
            <div>
              <p>
                Nombre <span className="required">*</span>
              </p>
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
              <p>Apellidos</p>
              <input
                className="input"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>
                Edad <span className="required">*</span> <p style={{ fontSize: '15px', display: 'inline' }}>(atención a personas mayores de 18 años)</p>
 
                </p>
              <input
                className="input"
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>
                Teléfono <span className="required">*</span>
              </p>
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
              <p>
                Correo electrónico <span className="required">*</span>
              </p>
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
              <p>
                Lugar de residencia <span className="required">*</span>
              </p>
              <input
                className="input"
                type="text"
                name="residencia"
                value={formData.residencia}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Disponibilidad horaria</p>
              <textarea
                className="textarea"
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Motivo de consulta</p>
              <textarea
                className="textarea"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="options">
            <p>
              Dónde nos conociste: <span className="required">*</span>
            </p>
            <label>
              <input
                type="radio"
                name="conocio"
                value="instagram"
                onChange={handleChange}
                required
              />{" "}
              Instagram
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
                value="google"
                onChange={handleChange}
                required
              />{" "}
              Google
            </label>
            <label>
              <input
                type="radio"
                name="conocio"
                value="otro"
                onChange={handleChange}
                required
              />{" "}
              Otro
            </label>
          </div>

          <div className="options">
            <p>Prefiero que mi psicóloga sea:</p>
            <label>
              <input
                type="radio"
                name="tipoSesion"
                value="Florencia Pía Visconti Bogosevich"
                onChange={handleChange}
                required
              />{" "}
              Florencia Pía Visconti Bogosevich
            </label>
            <label>
              <input
                type="radio"
                name="tipoSesion"
                value="Macarena Caterina Santi Turri"
                onChange={handleChange}
                required
              />{" "}
              Macarena Caterina Santi Turri
            </label>
            <label>
              <input
                type="radio"
                name="tipoSesion"
                value="El profesional que esté más especializado en mi motivo de consulta"
                onChange={handleChange}
                required
              />{" "}
              El profesional que esté más especializado en mi motivo de consulta
            </label>
          </div>

          <div className="options">
            <p>Frecuencia de sesiones:</p>
            <label>
              <input
                type="radio"
                name="frecuencia"
                value="semanal"
                onChange={handleChange}
                required
              />{" "}
              Semanal
            </label>
            <label>
              <input
                type="radio"
                name="frecuencia"
                value="quincenal"
                onChange={handleChange}
                required
              />{" "}
              Quincenal
            </label>
            <label>
              <input
                type="radio"
                name="frecuencia"
                value="consultar"
                onChange={handleChange}
                required
              />{" "}
              A consultar
            </label>
          </div>

          <div>
            <p>¿Tienes alguna duda?</p>
            <textarea
              className="textarea"
              name="dudas"
              value={formData.dudas}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox">
            <input type="checkbox" required />{" "}
            <span>
              Estoy de acuerdo con la política de privacidad{" "}
              <span className="required">*</span>
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
                Mantis Espacio Terapéutico utilizará los datos que envíe bajo su
                consentimiento, con la finalidad de contactarse con usted para
                coordinar una sesión y/o brindarle información sobre cualquier
                consulta en relación a los servicios que se ofrecen en este sitio
                web. Los datos compartidos se conservarán durante el tiempo
                necesario mientras se mantenga la relación comercial para cumplir
                con las obligaciones que responden a la finalidad del servicio
                ofrecido.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Modal de éxito */}
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

export default TurnosBlock;
