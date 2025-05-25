import React from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/quadranteImageBlock.module.css';

const QuadranteImageBlock = ({ configuration }) => {
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

        {/* Columna de Cuadrantes */}
        <div className={styles.contentColumn}>
          <h2 className={styles.title}>{configuration.title}</h2>
          <div className={styles.cuadrantesWrapper}>
            <div className={styles.cuadranteBox}>
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.cuadrante1 || '') }}
              />
            </div>
            <div className={styles.cuadranteBox}>
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.cuadrante2 || '') }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuadranteImageBlock;
