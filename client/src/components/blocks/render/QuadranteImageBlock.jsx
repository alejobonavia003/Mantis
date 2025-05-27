import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/quadranteImageBlock.module.css';

const QuadranteImageBlock = ({ configuration }) => {
  const cuadrantesRef = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );
    cuadrantesRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
            <div
              className={styles.cuadranteBox}
              ref={el => (cuadrantesRef.current[0] = el)}
            >
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.cuadrante1 || '') }}
              />
            </div>
            <div
              className={styles.cuadranteBox}
              ref={el => (cuadrantesRef.current[1] = el)}
            >
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
