// TurnosConfigurator.jsx
import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';

const TurnosConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (field, value) => {
    onChange(field, value);
  };//

  const handleSelectImage = (image) => {
    handleChange('sideImage', image.url);
    setShowGallery(false);
  };

  return (
    <>
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
        Imagen del costado:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config.sideImage || ''}
            onChange={(e) => handleChange('sideImage', e.target.value)}
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
    </>
  );
};

export default TurnosConfigurator;
