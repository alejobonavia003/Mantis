import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./styles/psychologistsBlock.module.css";

const PsychologistsBlock = ({ configuration }) => {
  const [psychologists, setPsychologists] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/psychologists`);
        setPsychologists(response.data.slice(0, configuration?.maxItems || 6));
      } catch (error) {
        console.error('Error cargando psicólogos:', error);
      }
    };
    fetchPsychologists();
  }, []);

  return (
    <div
      className={styles.psicologoscontainer}
      style={{ backgroundColor: configuration?.backgroundColor }}
    >
      {psychologists.map((psychologist, index) => (
        <div
          key={psychologist.id}
          className={`${styles.card} ${index % 2 === 0 ? styles.left : styles.right}`}
        >
          <div className={styles.imageContainer}>
            <img
              src={psychologist.foto}
              alt={psychologist.nombre}
              className={styles.image}
            />
          </div>

          <div className={`${index % 2 === 0 ? styles.contentpsleft : styles.contentpsright}`}>
            <h3
              className={styles.title}
              style={{ color: configuration?.titleColor }}
            >
              {psychologist.nombre}
            </h3>
            <p
              className={styles.subtitle}
              style={{ color: configuration?.textColor }}
            >
              {psychologist.oficio}
            </p>
            <p
              className={styles.description}
              style={{ color: configuration?.textColor }}
            >
              {psychologist.especializacion}
            </p>

            <a
              href={`/psicologos/${psychologist.slug}`}
              className={styles.psbutton}
              style={{
                backgroundColor: configuration?.buttonColor,
                color: configuration?.buttonTextColor
              }}
            >
              {configuration?.buttonText || 'Conocer más'}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PsychologistsBlock;