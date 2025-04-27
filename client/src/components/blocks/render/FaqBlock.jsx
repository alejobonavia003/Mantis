import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/faqBlock.module.css';

const FaqBlock = ({ configuration }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Maneja la expansión de la pregunta seleccionada
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const bgStyle = {
    backgroundColor: configuration.backgroundColor || '#ffffff',
  };

  return (
    <div style={bgStyle} className={styles.totalcontainers} >
      <div className={styles.faqContainer} >
      {/* Contenedor de preguntas */}
      <div className={styles.faqContent}>
        <h2 className={styles.faqTitle}>Preguntas Frecuentes</h2>
        {configuration.faqs?.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.question}</span>
              {/* Flechita visual indicando expandir o contraer */}
              <span className={styles.faqArrow}>
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {activeIndex === index && (
              <div
                style={bgStyle}
                className={styles.faqAnswer}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer || '') }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Imagen lateral (opcional) */}
      {configuration.sideImage && (
        <div className={styles.faqImageSection}>
          <img
            src={configuration.sideImage}
            alt="Imagen Lateral"
            className={styles.faqSideImage}
          />
        </div>
      )}

</div>
    </div>
  );
};

export default FaqBlock;
