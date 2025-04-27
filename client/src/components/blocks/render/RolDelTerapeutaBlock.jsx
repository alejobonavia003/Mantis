import React from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/rolDelTerapeutaBlock.module.css';

const RoldelTerapeutaBlock = ({ configuration }) => {
  const { titulo = '', descripcion = '', practices = [] } = configuration || {};

  // Agrupamos las prácticas en pares (buena y mala)
  const pairedPractices = practices.reduce((pairs, practice, index) => {
    if (index % 2 === 0) {
      pairs.push([practice]);
    } else {
      pairs[pairs.length - 1].push(practice);
    }
    return pairs;
  }, []);

  return (
    <div className={styles.rolBlock}>
      {/* Título y descripción */}
      <div className={styles.roltextContent}>
        {titulo && (
          <div
            className={styles.roltitle}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(titulo) }}
          />
        )}
        {descripcion && (
          <p
            className={styles.roldescription}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descripcion) }}
          />
        )}
      </div>

      {/* Contenedor de prácticas */}
      <div className={styles.practicesContainer}>
        {pairedPractices.map((pair, index) => (
          <div key={index} className={styles.practiceRow}>
            {pair.map((practice, idx) => (
              <div
                key={idx}
                className={`${styles.practice} ${
                  practice.type === 'good' ? styles.good : styles.bad
                }`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(practice.text) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoldelTerapeutaBlock;
