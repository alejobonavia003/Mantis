import React, { useState, useEffect } from 'react';
//import styles from '../styles/AdminPsRegister.module.css';
import ImageGallery from './AdminImageGallery';

const PsicologoForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    oficio: '',
    especializacion: '',
    telefono: '',
    email: '',
    descripcionCorta: '',
    descripcionLarga: '',
    formaciones: [],
    areasAyuda: [],
    foto: '',
    slug: ''
  });

  const [currentArea, setCurrentArea] = useState('');
  const [currentFormacion, setCurrentFormacion] = useState('');
  const [showGallery, setShowGallery] = useState(false);

  // Cargar datos iniciales para edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        oficio: initialData.oficio || '',
        especializacion: initialData.especializacion || '',
        telefono: initialData.telefono || '',
        email: initialData.email || '',
        descripcionCorta: initialData.descripcionCorta || '',
        descripcionLarga: initialData.descripcionLarga || '',
        disponibilidad: initialData.disponibilidad || '',
        formaciones: initialData.formaciones || [],
        areasAyuda: initialData.areasAyuda || [],
        foto: initialData.foto || '',
        slug: initialData.slug || ''
      });
    }
  }, [initialData]);

  // Función para manejar la selección de imagen
  const handleSelectImage = (image) => {
    setFormData(prev => ({
      ...prev,
      foto: image.url
    }));
    setShowGallery(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formGroup">
        <label>Nombre Completo:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>Título/Oficio:</label>
        <input
          type="text"
          name="oficio"
          value={formData.oficio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>especializacion: :</label>
        <input
          type="text"
          name="especializacion"
          value={formData.especializacion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>nombre del perfil de instagram :</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>link de cuenta de instagram :</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}

        />
      </div>

      <div className="formGroup">
        <label>Disponibilidad:</label>
        <textarea
          name="disponibilidad"
          value={formData.disponibilidad}
          onChange={handleChange}
          placeholder="Ej: Lunes a Viernes de 9:00 a 18:00"
          rows="3"
        />
      </div>

      <div className="formGroup">
        <label>Descripción Corta:</label>
        <textarea
          name="descripcionCorta"
          value={formData.descripcionCorta}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>Descripción Larga:</label>
        <textarea
          name="descripcionLarga"
          value={formData.descripcionLarga}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label>URL de la Foto:</label>
        <div className="imageInputContainer">
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
          <div className="galleryButtons">
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="galleryButton"
            >
              Abrir Galería
            </button>
            <button
              type="button"
              onClick={() => setShowGallery(false)}
              className="galleryButton"
            >
              Cerrar Galería
            </button>
          </div>
        </div>
        {formData.foto && (
          <div className="imagePreview">
            <img src={formData.foto} alt="Previsualización" />
          </div>
        )}
      </div>

      {/* Resto del formulario... */}

      {/* Mostrar la galería cuando sea necesario */}
      {showGallery && <ImageGallery onSelectImage={handleSelectImage} />}

      <div className="formGroup">
        <label>Áreas de Ayuda:</label>
        <div className="arrayInput">
          <input
            type="text"
            value={currentArea}
            onChange={(e) => setCurrentArea(e.target.value)}
            placeholder="Nueva área de ayuda"
          />
          <button
            type="button"
            onClick={() => {
              handleArrayChange('areasAyuda', currentArea);
              setCurrentArea('');
            }}
          >
            Agregar
          </button>
        </div>
        <div className="arrayList">
          {formData.areasAyuda.map((area, index) => (
            <span key={index} className="arrayItem">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="formGroup">
        <label>Formaciones:</label>
        <div className="arrayInput">
          <input
            type="text"
            value={currentFormacion}
            onChange={(e) => setCurrentFormacion(e.target.value)}
            placeholder="Nueva formación"
          />
          <button
            type="button"
            onClick={() => {
              handleArrayChange('formaciones', currentFormacion);
              setCurrentFormacion('');
            }}
          >
            Agregar
          </button>
        </div>
        <div className="arrayList">
          {formData.formaciones.map((formacion, index) => (
            <span key={index} className="arrayItem">
              {formacion}
            </span>
          ))}
        </div>
      </div>

      <div className="formActions">
        <button type="submit" className="saveButton">
          {initialData ? 'Actualizar' : 'Crear'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="cancelButton">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PsicologoForm;