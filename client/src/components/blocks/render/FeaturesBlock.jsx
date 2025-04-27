import React from 'react';
import styles from "./styles/featureBlock.module.css";
import DOMPurify from 'dompurify';

const FeaturesBlock = ({ configuration }) => {
  // Define cantidad de columnas y valida si hay items disponibles
  const columns = configuration?.columns || 3;
  const items = configuration?.items || [];

  return (
    <div className={styles.previewFeatures}>
      {[...Array(columns)].map((_, i) => (
        <div key={i} className={styles.featureColumn}>
          <h4>{items[i]?.title || `Feature ${i + 1}`}</h4>
          <p>{items[i]?.description || 'Descripción breve'}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesBlock;
