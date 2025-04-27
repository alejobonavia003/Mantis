import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/therapyBlock.module.css';

const TherapyBlock = ({ configuration }) => {
  const { title, backgroundColor, subtitles = {} } = configuration || {};
  const quadrantsRef = useRef([]);


  // Animación al aparecer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.appear);
          }
        });
      },
      { threshold: 0.1 }
    );

    quadrantsRef.current.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.therapyBlock} style={{ backgroundColor }}>
      <h2 className={styles.mainTitle}>{title}</h2>

      {configuration?.subtitle1 && (
        <div className={styles.topQuadrant}>
          <div
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle1) }}
          />
        </div>
      )}

      {configuration?.subtitle2 && (
        <div

          className={styles.topQuadrant}
        >
          <div
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle2) }}
          />
        </div>
      )}

      <div className={styles.quadrantsContainer}>

        {configuration?.subtitle3 && (
          <div
            ref={el => el && quadrantsRef.current.push(el)}
            className={`${styles.quadrant} ${styles.right}`}
          >
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle3) }}
            />
          </div>
        )}

        {configuration?.subtitle4 && (
          <div ref={el => el && quadrantsRef.current.push(el)}
            className={`${styles.quadrantNONE} ${styles.left}`}>
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle5) }}
            />
          </div>
        )}
      </div>

      {// CUADRANTE DE LA PARTE INFERIOR IZQUIERDA
      }


      <div className={styles.quadrantsContainer}>

        {configuration?.subtitle3 && (
          <div
            ref={el => el && quadrantsRef.current.push(el)}
            className={`${styles.quadrantNONE} ${styles.right}`}
          >
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle5) }}
            />
          </div>
        )}

        {configuration?.subtitle4 && (
          <div ref={el => el && quadrantsRef.current.push(el)}
            className={`${styles.quadrant} ${styles.left}`}>
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle4) }}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default TherapyBlock;