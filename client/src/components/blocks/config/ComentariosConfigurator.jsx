import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import RichTextEditor from '../../dnd/RichTextEditor';
import styles from '../render/styles/configuratorBlock.module.css';

const ComentariosConfigurator = ({ config, onChange }) => {
  const [showBlobGallery, setShowBlobGallery] = useState(false);
  
  const [showGallery, setShowGallery] = useState(false);
  const [showGalleryblobs, setShowGalleryblobs] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (field, value) => {
    onChange(field, value);
  };
  
  const handleSelectImage = (image) => {
    handleChange('image', image.url);
    setShowGallery(false);
  };

  const handleSelectBlobs = (image) => {
    const newIcons = [...(config.blobs || []), image.url];
    handleChange('blobs', newIcons);
    setShowBlobGallery(false);
  };




  return (
    <>
      <label className={styles.label}>
        Título:
        <RichTextEditor
          value={config.title || ''}
          onChange={(content) => handleChange('title', content)}
        />
      </label>

      <label className={styles.label}>
  Parraffo:
  <RichTextEditor
  value={config.subtitle || ''}
  onChange={(content) => {
    handleChange('subtitle', content);
  }}
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
        Texto del botón 3:
        <input
          type="text"
          value={config.buttonText3 || ''}
          onChange={(e) => handleChange('buttonText3', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón 3:
        <input
          type="url"
          value={config.buttonUrl3 || ''}
          onChange={(e) => handleChange('buttonUrl3', e.target.value)}
          className={styles.input}
        />
      </label>



      <label className={styles.label}>
        Color del botón 3:
        <input
          type="color"
          value={config.buttonColor3 || '#007bff'}
          onChange={(e) => handleChange('buttonColor3', e.target.value)}
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
        Imagen de fondo:
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




      <div className={styles.section}>
        <h3>Manchas</h3>
        <div className={styles.imageGrid}>
          {config.blobs?.map((blob, index) => (
            <div key={index} className={styles.imageThumbnail}>
              <img src={blob} alt={`Icono ${index + 1}`} className={styles.imageiconlist}/>
              <button
                type="button"
                onClick={() => handleChange('blobs', config.blobs.filter((_, i) => i !== index))}
                className={styles.removeButton}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShowGalleryblobs(true)}
            className={styles.addImageButton}
          >
            + Agregar Ícono
          </button>
        </div>

              {showGalleryblobs && (
                <div className={styles.galleryModal}>
                  <ImageGallery onSelectImage={handleSelectBlobs} apiUrl={apiUrl} />
                  <button
                    type="button"
                    onClick={() => setShowGalleryblobs(false)}
                    className={styles.closeButton}
                  >
                    Cerrar Galería
                  </button>
                </div>
              )}
            

      </div>


      
    </>

  );
};

export default ComentariosConfigurator;
