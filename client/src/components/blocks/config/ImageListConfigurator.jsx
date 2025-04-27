import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const ImageListConfigurator = ({ config, onChange }) => {
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
  Parraffo:
  <RichTextEditor
    value={config.subtitle || ''}
    onChange={(content) => handleChange('subtitle', content)}
  />
</label>

<label className={styles.label}>
  texto de abajo:
  <RichTextEditor
    value={config.botomtext || ''}
    onChange={(content) => handleChange('botomtext', content)}
  />
</label>

      <label className={styles.label}>
        Texto del botón 1:
        <input
          type="text"
          value={config.buttonText1 || ''}
          onChange={(e) => handleChange('buttonText1', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón 1:
        <input
          type="url"
          value={config.buttonUrl1 || ''}
          onChange={(e) => handleChange('buttonUrl1', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color del botón 1:
        <input
          type="color"
          value={config.buttonColor1 || '#007bff'}
          onChange={(e) => handleChange('buttonColor1', e.target.value)}
          className={styles.colorInput}
        />
      </label>








      <label className={styles.label}>
        Texto del botón 2:
        <input
          type="text"
          value={config.buttonText2 || ''}
          onChange={(e) => handleChange('buttonText2', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón 2:
        <input
          type="url"
          value={config.buttonUrl2 || ''}
          onChange={(e) => handleChange('buttonUrl2', e.target.value)}
          className={styles.input}
        />
      </label>



      <label className={styles.label}>
        Color del botón 2:
        <input
          type="color"
          value={config.buttonColor2 || '#007bff'}
          onChange={(e) => handleChange('buttonColor2', e.target.value)}
          className={styles.colorInput}
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

export default ImageListConfigurator;