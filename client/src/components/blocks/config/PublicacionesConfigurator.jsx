import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery'; 
import styles from '../render/styles/configuratorBlock.module.css';

const PublicacionesConfigurator = ({ config, onChange }) => {
  // Este estado nos indica el índice de la publicación cuya galería está abierta, o null si ninguna.
  const [openGalleryIndex, setOpenGalleryIndex] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para actualizar campos globales del bloque
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  // Función para actualizar campos dentro del array "posts".
  const handlePostChange = (index, field, value) => {
    const updatedPosts = [...config.posts];
    updatedPosts[index][field] = value;
    onChange({ ...config, posts: updatedPosts });
  };

  // Función que se dispara al seleccionar una imagen desde la galería para un post específico
  const handleSelectImage = (image, index) => {
    handlePostChange(index, 'image', image.url);
    setOpenGalleryIndex(null); // Cierra la galería una vez seleccionada la imagen
  };

  return (
    <div className={styles.configuratorBlock}>
      {/* Título del bloque */}
      <label className={styles.label}>
        Título:
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className={styles.input}
        />
      </label>

      {/* Configuración de las 5 publicaciones */}
      {config.posts?.map((post, index) => (
        <div key={index} className={styles.postItem}>
          <hr />
          <h4>Publicación {index + 1}</h4>
          
          {/* Campo para la URL de la imagen */}
          <label className={styles.label}>
            Imagen (miniatura):
            <input
              type="text"
              value={post.image}
              onChange={(e) => handlePostChange(index, 'image', e.target.value)}
              placeholder="URL de la imagen"
              className={styles.input}
            />
          </label>
          {/* Botón para abrir/cerrar la galería para esta publicación */}
          <button
            type="button"
            onClick={() =>
              setOpenGalleryIndex(openGalleryIndex === index ? null : index)
            }
            className={styles.galleryToggle}
          >
            {openGalleryIndex === index ? 'Cerrar Galería' : 'Abrir Galería'}
          </button>
          {/* Muestra la galería solo si openGalleryIndex es igual al índice actual */}
          {openGalleryIndex === index && (
            <div className={styles.galleryModal}>
              <ImageGallery
                onSelectImage={(image) => handleSelectImage(image, index)}
                apiUrl={apiUrl}
              />
              <button
                type="button"
                onClick={() => setOpenGalleryIndex(null)}
                className={styles.closeButton}
              >
                Cerrar Galería
              </button>
            </div>
          )}

          {/* Campo para la URL de la publicación */}
          <label className={styles.label}>
            URL de la publicación:
            <input
              type="text"
              value={post.url}
              onChange={(e) => handlePostChange(index, 'url', e.target.value)}
              className={styles.input}
            />
          </label>

          {/* Checkbox para indicar si la publicación es reel */}
          <label className={styles.label}>
            ¿Es reel?
            <input
              type="checkbox"
              checked={post.isReel}
              onChange={(e) =>
                handlePostChange(index, 'isReel', e.target.checked)
              }
            />
          </label>
        </div>
      ))}

      {/* Opción de color de fondo del bloque */}
      <label className={styles.label}>
        Color de fondo del bloque:
        <input
          type="color"
          value={config.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className={styles.input}
        />
      </label>
      {/* Configuración del botón principal */}
      <label className={styles.label}>
        Texto del botón:
        <input
          type="text"
          value={config.buttonText || ''}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        URL del botón:
        <input
          type="text"
          value={config.buttonUrl || ''}
          onChange={(e) => handleChange('buttonUrl', e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Color del botón:
        <input
          type="color"
          value={config.buttonColor || '#007bff'}
          onChange={(e) => handleChange('buttonColor', e.target.value)}
          className={styles.input}
        />
      </label>

      {/* Configuración del botón principal */}
      <label className={styles.label}>
        Texto del botón2:
        <input
          type="text"
          value={config.buttonText2 || ''}
          onChange={(e) => handleChange('buttonText2', e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        URL del botón2:
        <input
          type="text"
          value={config.buttonUrl2 || ''}
          onChange={(e) => handleChange('buttonUrl2', e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Color del botón2:
        <input
          type="color"
          value={config.buttonColor2 || '#007bff'}
          onChange={(e) => handleChange('buttonColor2', e.target.value)}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default PublicacionesConfigurator;
