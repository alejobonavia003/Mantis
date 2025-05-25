import React, { useState } from 'react';
import styles from "./styles/pricingBlock.module.css";
import DOMPurify from 'dompurify';
import styles2 from './styles/faqBlock.module.css';

const PricingBlock = ({ configuration }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Maneja la expansión de la pregunta seleccionada
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <div className={styles.outerContainer} style={{ backgroundColor: configuration?.backgroundColor || '#ffffff' }}>
      <div className={styles.pricingSection} style={{ backgroundColor: configuration?.backgroundColor || '#ffffff' }}>
        {/* Círculo decorativo superior */}
        <div className={styles.decorationCircle}>
          <img
            src={configuration?.image || 'placeholder.jpg'}
            alt="Decoración circular"
          />
        </div>

        {configuration?.title && <h2 className={styles.sectionTitle}>{DOMPurify.sanitize(configuration.title)}</h2>}

        <div className={styles.cardsContainer}>
          {configuration?.cards?.map((card, index) => (
            <div key={index} className={styles.cardWrapper}>
              {/* Contenedor principal con borde */}
              <div className={styles.cardContent} style={{ backgroundColor: card.cardBackground }}>
                <div className={styles.cardHeader}>
                  <h3>{DOMPurify.sanitize(card.title)}</h3>
                  <p className={styles.duration}>{DOMPurify.sanitize(card.duration)}</p>
                  <div className={styles.price} style={{
                    color: card.colorPrice || '#007bff',
                    backgroundColor: card.cardBackground || '#ffffff'
                  }}>
                    {DOMPurify.sanitize(card.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Botón posicionado fuera del área con borde */}
        <div className={styles.buttonContainerPricing}>
          <a
            href="turnos"
            className={styles.cardButton}
            style={{ backgroundColor: configuration?.buttonColor }}
          >
            {configuration?.buttonText}
          </a>
        </div>

        {/* Pregunta de la divisa */}
        <div className={styles.faqItempricing}>
          <div
            className={styles.faqQuestionPricing}
            onClick={() => toggleFaq(0)} // Usa un índice fijo para esta pregunta
          >
            <span>¿Te encuentras en un país con otra divisa?</span>
            {/* Flechita visual indicando expandir o contraer */}
            <span className={styles2.faqArrow}>
              {activeIndex === 0 ? '▲' : '▼'}
            </span>
          </div>
          {activeIndex === 0 && (
            <div className={styles2.faqAnswer}>
              <p>
                Si te encuentras en un país con otra divisa, al momento de completar el formulario de “solicitud de sesión”, te enviaremos el valor de la consulta de acuerdo a la moneda de tu país.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingBlock;
