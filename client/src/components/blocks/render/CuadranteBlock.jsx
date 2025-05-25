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

  // Renderizar manchas decorativas si están activadas y se seleccionaron todas
  const showAllBlobs = (configuration?.blobs);
  return (
    <div className={styles.therapyBlockMain} style={{ backgroundColor }}>
 {/* Manchas decorativas laterales fijas y responsivas */}
      {showAllBlobs && (
        <>
          <img
            src="/pinselada-1.png"
            alt="Pincelada izquierda"
            className={styles.pinselada&&styles.pinsel1}
          />

          <img
            src="/pinselada.png"
            alt="Pincelada derecha"
            className={styles.pinselada&&styles.pinsel2}
          />
                    <img
            src="/pinselada-1.png"
            alt="Pincelada derecha"
            className={styles.pinselada&&styles.pinsel3}
          />
                    <img
            src="/pinselada-1.png"
            alt="Pincelada derecha"
            className={styles.pinselada&&styles.pinsel4}
          />
                    <img
            src="/pinselada-1.png"
            alt="Pincelada derecha"
            className={styles.pinselada&&styles.pinsel5}
          />

        </>
      )}
    <div className={styles.therapyBlock} >
     

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



      {// CUADRANTE DE LA PARTE INFERIOR IZQUIERDA
      }




    </div>

    <div className={styles.quadrantsContainers}>

          <div className={styles.quadrantsContainer}
        style={{ display: 'flex', justifyContent: 'flex-end' }}>

        {configuration?.subtitle3 && (
          <div
            ref={el => el && quadrantsRef.current.push(el)}
            className={`${styles.quadrantNONE} ${styles.right}`}
            style={{ display: 'none' }}
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

       <div className={styles.quadrantsContainer}
       style={{ display: 'flex', justifyContent: 'flex-start' }}>

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
            className={`${styles.quadrantNONE} ${styles.left}`}
            style={{ display: 'none' }}>
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle5) }}
            />
          </div>
        )}

        </div>
      </div>
          {configuration?.buttonText3 && (
            <a 
              href={configuration?.buttonUrl3 || '#'} 
              className={styles.heroButton3}
              style={{ backgroundColor: configuration?.buttonColor3 || '#007bff' }}
            >
              {configuration.buttonText3}
            </a>
          )}
    </div>
  );
};

export default TherapyBlock;