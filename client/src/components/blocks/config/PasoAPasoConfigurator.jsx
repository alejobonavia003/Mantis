import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const PasoAPasoConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(null); // Para saber qué paso está seleccionando la imagen

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSelectImage = (image) => {
    const newSteps = [...config.steps];
    if (currentStepIndex !== null) {
      newSteps[currentStepIndex].image = image.url; // Asigna la URL de la imagen al paso correspondiente
      handleChange('steps', newSteps);
    }
    setShowGallery(false);
    setCurrentStepIndex(null);
  };



  const removeStep = (index) => {
    const newSteps = config.steps.filter((_, i) => i !== index);
    handleChange('steps', newSteps);
  };

  const updateStepDescription = (index, description) => {
    const newSteps = [...config.steps];
    newSteps[index].description = description;
    handleChange('steps', newSteps);
  };

  return (//description
    <div className={styles.pasoAPasoConfigurator}>

      <label className={styles.label}>
          description:
        <RichTextEditor
          value={config.titulo || ''}
          onChange={(content) => handleChange('titulo', content)}
        />
      </label>

      <label className={styles.label}>
      description:
        <RichTextEditor
          value={config.description || ''}
          onChange={(content) => handleChange('description', content)}
        />
      </label>


      <h3>Configuración de Pasos</h3>
      <div className={styles.stepsContainer}>
        {config.steps?.map((step, index) => (
          <div key={index} className={styles.stepItem}>
            <div className={styles.stepImageContainer}>
              {step.image ? (
                <img
                  src={step.image}
                  alt={`Paso ${index + 1}`}
                  className={styles.stepImage}
                />
              ) : (
                <div className={styles.placeholder}>Sin imagen</div>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowGallery(true);
                  setCurrentStepIndex(index);
                }}
                className={styles.addImageButton}
              >
                {step.image ? 'Cambiar Imagen' : 'Agregar Imagen'}
              </button>
            </div>
            <RichTextEditor
              value={step.description || ''}
              onChange={(e) => updateStepDescription(index, e)}
              placeholder={`Descripción del paso ${index + 1}`}
              className={styles.stepDescription}
            />
          </div>
        ))}
      </div>


      {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery
            onSelectImage={handleSelectImage}
            apiUrl={import.meta.env.VITE_API_URL}
          />
          <button
            type="button"
            onClick={() => {
              setShowGallery(false);
              setCurrentStepIndex(null);
            }}
            className={styles.closeButton}
          >
            Cerrar Galería
          </button>
        </div>
      )}


      <label className={styles.label}>
        Texto del botón :
        <input
          type="text"
          value={config.buttonText || ''}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón :
        <input
          type="url"
          value={config.buttonUrl || ''}
          onChange={(e) => handleChange('buttonUrl', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color del botón :
        <input
          type="color"
          value={config.buttonColor || '#618e7e'}
          onChange={(e) => handleChange('buttonColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>
      <label className={styles.label}>
        Texto del botón 2:
        <input
          type="text"
          value={config.buttonText2 || ''}
          onChange={(e) => handleChange('buttonText2', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        URL del botón 2:
        <input
          type="url"
          value={config.buttonUrl2 || ''}
          onChange={(e) => handleChange('buttonUrl2', e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color del botón 2:
        <input
          type="color"
          value={config.buttonColor2 || '#516f61'}
          onChange={(e) => handleChange('buttonColor2', e.target.value)}
          className={styles.colorInput}
        />
      </label>
    </div>
  );
};

export default PasoAPasoConfigurator;