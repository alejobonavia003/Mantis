import { useState } from 'react';
import styles from '../render/styles/configuratorBlock.module.css';

const PsychologistsConfigurator = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <>
      <label className={styles.label}>
        Color de fondo:
        <input
          type="color"
          value={config.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Color del título:
        <input
          type="color"
          value={config.titleColor || '#333333'}
          onChange={(e) => handleChange('titleColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Color del texto:
        <input
          type="color"
          value={config.textColor || '#666666'}
          onChange={(e) => handleChange('textColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Texto del botón:
        <input
          type="text"
          value={config.buttonText || 'Conocer más'}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color del botón:
        <input
          type="color"
          value={config.buttonColor || '#007bff'}
          onChange={(e) => handleChange('buttonColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Color texto botón:
        <input
          type="color"
          value={config.buttonTextColor || '#ffffff'}
          onChange={(e) => handleChange('buttonTextColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Máximo de items:
        <input
          type="number"
          value={config.maxItems || 6}
          onChange={(e) => handleChange('maxItems', e.target.value)}
          min="1"
          max="12"
          className={styles.input}
        />
      </label>
    </>
  );
};

export default PsychologistsConfigurator;