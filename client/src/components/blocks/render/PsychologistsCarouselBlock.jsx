import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./styles/psychologistsCarousel.module.css";
import PsychologistCard from '../../PsychologistCard';

const PsychologistsCarouselBlock = ({ configuration }) => {
  const [psychologists, setPsychologists] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/psychologists`);
        setPsychologists(response.data.slice(0, configuration?.maxItems || 4));
      } catch (error) {
        console.error('Error cargando psicólogos:', error);
      }
    };
    fetchPsychologists();
  }, []);

  return (
    <div 
      className={styles.outerContainer} 
      style={{ backgroundColor: configuration?.backgroundColor || '#ffffff' }}
    >
      {/* Manchas decorativas de pincelada */}
      <img
        src="/pinseladas.png"
        alt="Pincelada izquierda"
        className={styles.pinseladaIzquierda}
      />
      <img
        src="/pinseladas.png"
        alt="Pincelada derecha"
        className={styles.pinseladaDerecha}
      />
      <div className={styles.pricingSection}>
        {/* Círculo decorativo superior con icono */}
        <div className={styles.decorationCircle}>
          <img 
            src={configuration?.image || 'default-icon.png'} 
            alt="Icono decorativo" 
          />
        </div>

        <div className={styles.titulo}>
          <h2 style={{ color: configuration?.titleColor }}>
            {configuration?.titulo ?? "Texto predeterminado"}
          </h2>
        </div>

        <div className={styles.cardsContainer}>
          {psychologists.map((psychologist) => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}
        </div>
      </div>

      {configuration?.descripcion && (
        <div className={styles.descriptionpscontainer}dangerouslySetInnerHTML={{ __html: configuration?.descripcion }} 
          
      />
      )}

      {configuration?.mainButtonText && (
        <div className={styles.mainButtonContainer}>
          <a
            href={configuration?.mainButtonUrl || '/nosotros'}
            className={styles.mainButton}
            style={{ 
              backgroundColor: configuration?.mainButtonColor,

            }}
          >
            {configuration.mainButtonText}
          </a>
        </div>
      )}
    </div>
  );
};

export default PsychologistsCarouselBlock;
