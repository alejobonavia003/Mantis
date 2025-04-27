import React from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/imageListBlock.module.css';

const ImageListBlock = ({ configuration }) => {
  const subtitleHTML = configuration?.subtitle || '';
  return (
    <div className={styles.imagelistcontainer} style={{ backgroundColor: configuration.backgroundColor }}>
      <div className={styles.columnsWrapper}>
        {/* Columna de Imagen */}
        <div className={styles.imageColumn}>
          {configuration.image && (
            <img
              src={configuration.image}
              alt="Ilustración"
              className={styles.image}
            />
          )}
        </div>

        {/* Columna de Contenido */}
        <div className={styles.contentColumn}>
          <h2 className={styles.title}>{configuration.title}</h2>

          <p 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitleHTML) }} 
        />


        </div>
      </div>

      <div className={styles.buttonContainer}>
          {configuration?.buttonText1 && (
            <a 
              href={configuration?.buttonUrl1 || '#'} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor1 || '#007bff' }}
            >
              {configuration.buttonText1}
            </a>
          )}
          {configuration?.buttonText2 && (
            <a 
              href={configuration?.buttonUrl2 || '#'} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor2 || '#007bff' }}
            >
              {configuration.buttonText2}
            </a>
          )}

          </div>

          
    </div>
  );
};

export default ImageListBlock;