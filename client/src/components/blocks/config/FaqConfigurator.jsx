import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import RichTextEditor from '../../dnd/RichTextEditor';
import styles from '../render/styles/configuratorBlock.module.css';

const FaqConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Manejador genérico para cambiar propiedades
  const handleConfigChange = (field, value) => {
    onChange(field, value);
  };

  // Selección de imagen desde la galería
  const handleSelectImage = (image) => {
    handleConfigChange('sideImage', image.url);
    setShowGallery(false);
  };

  // Añadir una nueva pregunta
  const handleAddFaq = () => {
    const newFaqs = [
      ...(config.faqs || []),
      { question: 'Nueva pregunta', answer: '<p>Respuesta...</p>' }
    ];
    handleConfigChange('faqs', newFaqs);
  };

  // Actualizar una pregunta o respuesta existente
  const handleUpdateFaq = (index, field, value) => {
    const newFaqs = [...(config.faqs || [])];
    newFaqs[index][field] = value;
    handleConfigChange('faqs', newFaqs);
  };

  // Eliminar una pregunta
  const handleRemoveFaq = (index) => {
    const newFaqs = (config.faqs || []).filter((_, i) => i !== index);
    handleConfigChange('faqs', newFaqs);
  };

  return (
    <div>
      {/* Color de fondo */}
      <label className={styles.label}>
        Color de fondo:
        <input
          type="color"
          value={config.backgroundColor || '#ffffff'}
          onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      {/* Imagen lateral */}
      <label className={styles.label}>
        Imagen lateral:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config.sideImage || ''}
            onChange={(e) => handleConfigChange('sideImage', e.target.value)}
            placeholder="URL de la imagen"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowGallery(!showGallery)}
            className={styles.galleryToggle}
          >
            {showGallery ? 'Cerrar Galería' : 'Abrir Galería'}
          </button>
        </div>
      </label>

      {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage} apiUrl={apiUrl} />
          <button
            type="button"
            onClick={() => setShowGallery(false)}
            className={styles.closeButton}
          >
            Cerrar Galería
          </button>
        </div>
      )}

      <hr />

      {/* Lista de Preguntas y Respuestas */}
      <h3>Preguntas Frecuentes</h3>
      {config.faqs?.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <label className={styles.label}>
            Pregunta:
            <input
              type="text"
              value={faq.question}
              onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Respuesta:
            <RichTextEditor
              value={faq.answer}
              onChange={(content) => handleUpdateFaq(index, 'answer', content)}
            />
          </label>

          <button
            type="button"
            onClick={() => handleRemoveFaq(index)}
            className={styles.removeButton}
          >
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFaq} className={styles.addButton}>
        + Agregar Pregunta
      </button>
    </div>
  );
};

export default FaqConfigurator;
