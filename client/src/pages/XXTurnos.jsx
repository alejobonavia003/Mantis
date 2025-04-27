import { useState } from "react";
import axios from 'axios';
//import "../styles/turnos.css"; // Importamos el archivo de estilos
import formularioIMG from "../assets/formulario_img.png"; // Agrega tu imagen aquí

 // Obtiene la URL base de la API desde la variable de entorno
 const apiUrl = import.meta.env.VITE_API_URL;

const Turnos = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("handleSubmit: " + JSON.stringify(formData));
    try {
      const response = await axios.post(`${apiUrl}api/turnos`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      //console.log("response: " + JSON.stringify(response.data));
      if (response.status === 200) { // Verifica el código de estado
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
      } else {
        alert("Error al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario.");
    }
  };


  return (
    <div className="container">
      <div className="image-section">
        <img src={formularioIMG} alt="Formulario de pre-sesión" className="image" />
        <p className="image-text">Formulario de pre-sesión</p>
      </div>
      <div className="form-section">
        <h2 className="title">Formulario de Turnos</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="grid">
            <div>
            <p>Nombre</p>
            <input className="input" type="text" name="nombre" placeholder="" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div>
            <p>Apellidos</p>
            <input className="input" type="text" name="apellidos" placeholder="" value={formData.apellidos} onChange={handleChange} required />
            </div>
            <div>
            <p>Edad</p>
            <input className="input" type="number" name="edad" placeholder="" value={formData.edad} onChange={handleChange} required />
            </div>
            <div>
            <p>Teléfono</p>
            <input className="input" type="text" name="telefono" placeholder="" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div>
            <p>Correo electrónico</p>
            <input className="input" type="email" name="email" placeholder="" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
            <p>Lugar de residencia</p>
            <input className="input" type="text" name="residencia" placeholder="" value={formData.residencia} onChange={handleChange} required />
            </div>
            <div>
            <p>Disponibilidad horaria</p>
            <textarea className="textarea" name="disponibilidad" placeholder="" value={formData.disponibilidad} onChange={handleChange} required />
            </div>
            <div>
            <p>Motivo de consulta</p>
            <textarea className="textarea" name="motivo" placeholder="" value={formData.motivo} onChange={handleChange} required />
            </div>
          </div>

          <div className="options">
            <p>Tipo de sesión:</p>
            <label><input type="radio" name="tipoSesion" value="individual" onChange={handleChange} required /> Terapia individual</label>
            <label><input type="radio" name="tipoSesion" value="pareja" onChange={handleChange} required /> Terapia de pareja</label>
          </div>

          <div className="options">
            <p>Donde nos conociste:</p>
            <label><input type="radio" name="conocio" value="instagram" onChange={handleChange} required /> instagram</label>
            <label><input type="radio" name="conocio" value="conocido" onChange={handleChange} required /> conocido</label>
            <label><input type="radio" name="conocio" value="google" onChange={handleChange} required /> google</label>
            <label><input type="radio" name="conocio" value="otro" onChange={handleChange} required /> otro</label>
          </div>

          <div className="options">
            <p>Frecuencia de sesiones:</p>
            <label><input type="radio" name="frecuencia" value="semanal" onChange={handleChange} required /> Semanal</label>
            <label><input type="radio" name="frecuencia" value="quincenal" onChange={handleChange} required /> Quincenal</label>
            <label><input type="radio" name="frecuencia" value="consultar" onChange={handleChange} required /> A consultar</label>
          </div>

          <div>
            <p>¿Tienes alguna duda?</p>
          <textarea className="textarea" name="dudas" placeholder="" value={formData.dudas} onChange={handleChange} />
          </div>

          <div className="checkbox">
            <input type="checkbox" required /> Estoy de acuerdo con la política de privacidad
          </div>
          <button type="submit" className="button">Enviar</button>
        </form>
      </div>
    </div>
  );

};

export default Turnos;
