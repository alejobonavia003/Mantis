import { useState } from 'react';
import RichTextEditor from '../../dnd/RichTextEditor';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';

const ProductsPromotionConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [showGallery2, setShowGallery2] = useState(false);

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSelectImage = (image) => {
    handleChange('image', image.url);
    setShowGallery(false);
  };
  const handleSelectImage2 = (image) => {
    handleChange('image2', image.url);
    setShowGallery2(false);
  };

  return (
    <>
      <label className={styles.label}>
        Titulo:
        <RichTextEditor
          value={config?.titulo || ''}
          onChange={(content) => handleChange('titulo', content)}
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        texto 1:
        <RichTextEditor
          value={config?.texto1 || ''}
          onChange={(content) => handleChange('texto1', content)}
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        imagen:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config?.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="URL de la imagen"
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

      <label className={styles.label}>
        imagen2:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config?.image2 || ''}
            onChange={(e) => handleChange('image2', e.target.value)}
            placeholder="URL de la imagen"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowGallery2(!showGallery2)}
            className={styles.galleryButton}
          >
            {showGallery2 ? 'Cerrar Galería' : 'Abrir Galería'}
          </button>
        </div>
        {config?.image2 && (
          <div className={styles.imagePreview}>
            <img src={config.image2} alt="Previsualización del icono 2" />
          </div>
        )}
      </label>




      <label className={styles.label}>
        texto 1:
        <RichTextEditor
          value={config?.texto2 || ''}
          onChange={(content) => handleChange('texto2', content)}
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        texto 1:
        <RichTextEditor
          value={config?.texto3 || ''}
          onChange={(content) => handleChange('texto3', content)}
          className={styles.textarea}
        />
      </label>


      <label className={styles.label}>
        texto 1:
        <RichTextEditor
          value={config?.texto4 || ''}
          onChange={(content) => handleChange('texto4', content)}
          className={styles.textarea}
        />
      </label>




      <label className={styles.label}>
        Color boton:
        <input
          type="color"
          value={config?.buttonColor || '#ff6600'}
          onChange={(e) => handleChange('buttonColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Texto botón:
        <input
          type="text"
          value={config?.mainButtonText}
          onChange={(e) => handleChange('mainButtonText', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL botón principal:
        <input
          type="url"
          value={config?.mainButtonUrl || '/productos'}
          onChange={(e) => handleChange('mainButtonUrl', e.target.value)}
          className={styles.input}
        />
      </label>

     
      {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage} />
        </div>
      )}
      {showGallery2 && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage2} />
        </div>
      )}
    </>
  );
};

export default ProductsPromotionConfigurator;
