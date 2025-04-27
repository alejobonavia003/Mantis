import { useState } from 'react';
import RichTextEditor from '../../dnd/RichTextEditor';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';

const PsychologistsCarouselConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSelectImage = (image) => {
    handleChange('image', image.url);
    setShowGallery(false);
  };

  return (
    <>
      {/* Nuevos campos agregados */}
      <label className={styles.label}>
        Título del bloque:
        <input
          type="text"
          value={config?.titulo || ''}
          onChange={(e) => handleChange('titulo', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Descripción del bloque:
        <RichTextEditor
             value={config.subtitle}
             onChange={(content) => handleChange('descripcion', content)}
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        Icono superior:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config?.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="URL del icono"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowGallery(!showGallery)}
            className={styles.galleryButton}
          >
            {showGallery ? 'Cerrar Galería' : 'Abrir Galería'}
          </button>
        </div>
        {config?.image && (
          <div className={styles.imagePreview}>
            <img src={config.image} alt="Previsualización del icono" />
          </div>
        )}
      </label>

      {/* Campos existentes */}
      <label className={styles.label}>
        Color de fondo:
        <input
          type="color"
          value={config.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>



      <label className={styles.label}>
        Color botones:
        <input
          type="color"
          value={config.buttonColor || '#007bff'}
          onChange={(e) => handleChange('buttonColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Texto botón principal:
        <input
          type="text"
          value={config.mainButtonText || 'Conoce nuestro equipo'}
          onChange={(e) => handleChange('mainButtonText', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL botón principal:
        <input
          type="url"
          value={config.mainButtonUrl || '/nosotros'}
          onChange={(e) => handleChange('mainButtonUrl', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color botón principal:
        <input
          type="color"
          value={config.mainButtonColor || '#007bff'}
          onChange={(e) => handleChange('mainButtonColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Máximo de items:
        <input
          type="number"
          value={config.maxItems || 4}
          onChange={(e) => handleChange('maxItems', e.target.value)}
          min="1"
          max="12"
          className={styles.input}
        />
      </label>

      {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage} />
        </div>
      )}
    </>
  );
};

export default PsychologistsCarouselConfigurator;