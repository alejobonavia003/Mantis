import React from 'react';
import styles from './styles/publicacionesBlock.module.css'; // Ajusta la ruta a tu carpeta de estilos

const PublicacionesBlock = ({ configuration }) => {
  const {
    title,
    posts = [],
    buttonText,
    buttonUrl,
    buttonColor,
    buttonText2,
    buttonUrl2,
    buttonColor2,
  } = configuration;

  // Un simple ícono "play" en SVG (puedes personalizarlo a tu gusto)
  const playIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="#fff"
      viewBox="0 0 24 24"
      className={styles.playIcon}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <div className={styles.publicacionesContainer}>
      {/* Título */}
      {title && <h2 className={styles.title}>{title}</h2>}

      {/* Fila con 5 imágenes */}
      <div className={styles.postsRow}>
        {posts.map((post, index) => (
          <a
            key={index}
            href={post.url || '#'}
            className={styles.postItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.imageWrapper}>
              {post.image && (
                <img
                  src={post.image}
                  alt={`Post ${index + 1}`}
                  className={styles.postImage}
                />
              )}
              {/* Si es reel, mostramos el ícono de "play" centrado */}
              {post.isReel && (
                <div className={styles.playOverlay}>
                  {playIcon}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>


      <div className={styles.contenedordebotones}>
        {/* Botón principal al final */}
        {buttonText2 && (
          <div className={styles.buttonContainer}>
            <a
              href={buttonUrl2 || '#'}
              className={styles.mainButton}
              style={{ backgroundColor: buttonColor2 || '#007bff' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText2}
            </a>
          </div>
        )}
                {buttonText && (
          <div className={styles.buttonContainer}>
            <a
              href={buttonUrl || '#'}
              className={styles.mainButton}
              style={{ backgroundColor: buttonColor || '#007bff' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>

    </div>
  );
};

export default PublicacionesBlock;
