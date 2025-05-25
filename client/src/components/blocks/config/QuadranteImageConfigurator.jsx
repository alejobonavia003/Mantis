import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const QuadranteImageConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSelectImage = (image) => {
    handleChange('image', image.url);
    setShowGallery(false);
  };

  return (
    <>
      <label className={styles.label}>
        Título:
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Cuadrante 1:
        <RichTextEditor
          value={config.cuadrante1 || ''}
          onChange={(content) => handleChange('cuadrante1', content)}
        />
      </label>

      <label className={styles.label}>
        Cuadrante 2:
        <RichTextEditor
          value={config.cuadrante2 || ''}
          onChange={(content) => handleChange('cuadrante2', content)}
        />
      </label>

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
        Imagen:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
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
        {config.image && (
          <div className={styles.imagePreview}>
            <img
              src={config.image}
              alt="Vista previa"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          </div>
        )}
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

export default QuadranteImageConfigurator;
