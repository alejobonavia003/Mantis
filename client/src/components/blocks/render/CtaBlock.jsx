import React from 'react';
import styles from "./styles/ctaBlock.module.css";
import DOMPurify from 'dompurify';

const CtaBlock = ({ configuration }) => {
  return (
    <div className={styles.previewCta}>
      <h3>{configuration?.title || '¡Únete ahora!'}</h3>
      <p>{configuration?.description || 'No te pierdas esta oportunidad'}</p>
      <button className={styles.ctaButton}>
        {configuration?.buttonText || 'Hacer clic'}
      </button>
    </div>
  );
};

export default CtaBlock;
