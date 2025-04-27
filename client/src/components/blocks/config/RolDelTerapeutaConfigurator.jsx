import { useState } from 'react';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const RolDelTerapeutaConfigurator = ({ config, onChange }) => {
  const [practices, setPractices] = useState(config.practices || []);

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handlePracticeChange = (index, field, value) => {
    const updatedPractices = [...practices];
    updatedPractices[index][field] = value;
    setPractices(updatedPractices);
    handleChange('practices', updatedPractices);
  };

  const addPractice = () => {
    const newPractice = { text: '', type: 'good' }; // Por defecto, buena práctica
    setPractices([...practices, newPractice]);
    handleChange('practices', [...practices, newPractice]);
  };

  const removePractice = (index) => {
    const updatedPractices = practices.filter((_, i) => i !== index);
    setPractices(updatedPractices);
    handleChange('practices', updatedPractices);
  };

  return (
    <>
      <label className={styles.label}>
        Título:
        <RichTextEditor
          value={config.titulo || ''}
          onChange={(content) => handleChange('titulo', content)}
        />
      </label>
      <label className={styles.label}>
        Descripción:
        <RichTextEditor
          value={config.descripcion || ''}
          onChange={(content) => handleChange('descripcion', content)}
        />
      </label>

      <div className={styles.practicesContainer}>
        <h3>Prácticas</h3>
        {practices.map((practice, index) => (
          <div key={index} className={styles.practiceItem}>
            <label>
              Tipo:
              <select
                value={practice.type}
                onChange={(e) => handlePracticeChange(index, 'type', e.target.value)}
              >
                <option value="good">Buena Práctica</option>
                <option value="bad">Mala Práctica</option>
              </select>
            </label>
            <RichTextEditor
              value={practice.text || ''}
              onChange={(content) => handlePracticeChange(index, 'text', content)}
            />
            <button
              type="button"
              onClick={() => removePractice(index)}
              className={styles.removeButton}
            >
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={addPractice} className={styles.addButton}>
          Agregar Práctica
        </button>
      </div>
    </>
  );
};

export default RolDelTerapeutaConfigurator;