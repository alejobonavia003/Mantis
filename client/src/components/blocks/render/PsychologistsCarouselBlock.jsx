import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from "./styles/psychologistsCarousel.module.css";
import PsychologistCard from '../../PsychologistCard';

const PsychologistsCarouselBlock = ({ configuration }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  const [slideDirection, setSlideDirection] = useState('left'); // 'left' | 'right'
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

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 900px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel: una tarjeta en móvil, dos en desktop, ambas rotando
  useEffect(() => {
    const visibleCount = isMobile ? 1 : 2;
    if (psychologists.length > visibleCount) {
      intervalRef.current = setInterval(() => {
        setSlideDirection('left');
        setCurrentIndex(prev => (prev + visibleCount) % psychologists.length);
      }, 3500);
      return () => clearInterval(intervalRef.current);
    } else {
      setCurrentIndex(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [psychologists, isMobile]);

  // Flechas de navegación manual para móvil
  const handlePrev = () => {
    setSlideDirection('right');
    const visibleCount = isMobile ? 1 : 2;
    setCurrentIndex((prev) => (prev - visibleCount + psychologists.length) % psychologists.length);
  };
  const handleNext = () => {
    setSlideDirection('left');
    const visibleCount = isMobile ? 1 : 2;
    setCurrentIndex((prev) => (prev + visibleCount) % psychologists.length);
  };

  return (
    <div 
      className={styles.outerContainer} 
      style={{ backgroundColor: configuration?.backgroundColor || '#ffffff' }}
    >
      {/* Manchas decorativas de pincelada. */}
      <img
        src="/pinseladas.png"
        alt="Pincelada izquierda"
        className={styles.pinseladaIzquierda}
      />
      <img
        src="/pinseladita.png"
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
          {/* Carousel para todas las resoluciones: 1 en móvil, 2 en desktop */}
          {psychologists.length > 0 ? (
            <div style={{ position: 'relative', width: '100%' }}>
              <div
                className={
                  slideDirection === 'left'
                    ? styles.carouselCardSlideLeft
                    : styles.carouselCardSlideRight
                }
                key={psychologists[currentIndex].id + '-' + (isMobile ? 'm' : 'd')}
                style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}
              >
                {(() => {
                  const visibleCount = isMobile ? 1 : 2;
                  const cards = [];
                  for (let i = 0; i < visibleCount; i++) {
                    const idx = (currentIndex + i) % psychologists.length;
                    cards.push(
                      <PsychologistCard key={psychologists[idx].id} psychologist={psychologists[idx]} />
                    );
                  }
                  return cards;
                })()}
              </div>
              {/* Flechas solo si hay más de visibleCount */}
              {psychologists.length > (isMobile ? 1 : 2) && (
                <>
                  <button
                    className={styles.carouselArrowLeft}
                    onClick={handlePrev}
                    aria-label="Anterior"
                  >
                    &#8592;
                  </button>
                  <button
                    className={styles.carouselArrowRight}
                    onClick={handleNext}
                    aria-label="Siguiente"
                  >
                    &#8594;
                  </button>
                  <div className={styles.carouselIndicators}>
                    {psychologists.map((_, idx) => (
                      <span
                        key={idx}
                        className={idx === currentIndex ? styles.carouselIndicatorActive : styles.carouselIndicator}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {configuration?.descripcion && (
        <div className={styles.descriptionpscontainer}dangerouslySetInnerHTML={{ __html: configuration?.descripcion }} />
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
