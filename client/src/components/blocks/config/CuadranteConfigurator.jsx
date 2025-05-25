import { useState } from 'react';
import RichTextEditor from '../../dnd/RichTextEditor';
import styles from '../render/styles/configuratorBlock.module.css';

const TherapyConfigurator = ({ config, onChange }) => {
    const handleChange = (field, value) => {
        onChange(field, value);
      };

  return (
    <>

      <label className={styles.label}>
        titulo 1:
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className={styles.input}
        />
      </label>


      <label className={styles.label}>
        Descripción 1:
        <RichTextEditor
          value={config.subtitle1 || ''}
          onChange={(content) => handleChange('subtitle1', content)}

        />
      </label>
      
      <label className={styles.label}>
        Descripción 2:
        <RichTextEditor
          value={config.subtitle2 || ''}
          onChange={(content) => handleChange('subtitle2', content)}
        />
      </label>
      
      <label className={styles.label}>
        Descripción 3:
        <RichTextEditor
          value={config.subtitle3 || ''}
          onChange={(content) => handleChange('subtitle3', content)}
        />
      </label>
      
      <label className={styles.label}>
        Descripción 4:
        <RichTextEditor
          value={config.subtitle4 || ''}
          onChange={(content) => handleChange('subtitle4', content)}
        />
      </label>

      <label className={styles.label}>
        Color de fondo:
        <input
          type="color"
          value={config.backgroundColor || '#F7EFCB'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label className={styles.label}>
        Manchas decorativas (pinceladas):
        <input
          type="checkbox"
          checked={!!config.blobs}
          onChange={e => handleChange('blobs', e.target.checked)}
          className={styles.input}
        />
        <span style={{marginLeft: 8}}>Mostrar manchas decorativas</span>
      </label>


      <label className={styles.label}>
        Texto del botón 3:
        <input
          type="text"
          value={config.buttonText3 || ''}
          onChange={(e) => handleChange('buttonText3', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón 3:
        <input
          type="url"
          value={config.buttonUrl3 || ''}
          onChange={(e) => handleChange('buttonUrl3', e.target.value)}
          className={styles.input}
        />
      </label>



      <label className={styles.label}>
        Color del botón 3:
        <input
          type="color"
          value={config.buttonColor3 || '#007bff'}
          onChange={(e) => handleChange('buttonColor3', e.target.value)}
          className={styles.colorInput}
        />
      </label>

    </>
  );
};

export default TherapyConfigurator;
