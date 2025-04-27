import React from 'react';
import styles from './styles/pasoAPasoBlock.module.css';
import DOMPurify from 'dompurify';

const PasoAPasoBlock = ({ configuration }) => {
  const { description, steps, buttonText, buttonText2, buttonUrl, buttonUrl2, buttonColor, buttonColor2, titulo } = configuration;

  return (
    <div className={styles.pasoContainer}>
      {titulo && <div className={styles.titulo}  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.titulo) }}/>}
      {description && <div className={styles.description} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description) }}/>}

      <div className={styles.stepsContainer}>
        {/* Paso 1 */}
        {steps?.[0] && (
          <div className={styles.stepBlock}>
            <div className={styles.stepNumber}>1</div>
            {steps[0].image && (
              <div className={styles.imageContainer}>
                <img src={steps[0].image} alt="Paso 1" className={styles.stepImage} />
              </div>
            )}
            <div className={styles.textContainer}>
              <div className={styles.stepDescription} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(steps[0].description) }} />
            </div>
          </div>
        )}

        {/* Paso 2 */}
        {steps?.[1] && (
          <div className={styles.stepBlock}>
            <div className={styles.stepNumber}>2</div>
            {steps[1].image && (
              <div className={styles.imageContainer}>
                <img src={steps[1].image} alt="Paso 2" className={styles.stepImage} />
              </div>
            )}
            <div className={styles.textContainer}>

              <div className={styles.stepDescription} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(steps[1].description) }} />
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {steps?.[2] && (
          <div className={styles.stepBlock}>
            <div className={styles.stepNumber}>3</div>
            {steps[2].image && (
              <div className={styles.imageContainer}>
                <img src={steps[2].image} alt="Paso 3" className={styles.stepImage} style={{ width: '90px', height: '90px'  }}/>
              </div>
            )}
            <div className={styles.textContainer}>

              <div className={styles.stepDescription} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(steps[2].description) }} />
            </div>
          </div>
        )}

        {/* Paso 4 */}
        {steps?.[3] && (
          <div className={styles.stepBlock}>
            <div className={styles.stepNumber}>4</div>
            {steps[3].image && (
              <div className={styles.imageContainer}>
                <img src={steps[3].image} alt="Paso 4" className={styles.stepImage} />
              </div>
            )}
            <div className={styles.textContainer}>
              <div className={styles.stepDescription} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(steps[3].description) }} />
            </div>
          </div>
        )}
      </div>




      {/* filepath: /home/oxxoxxx/Escritorio/turnos-app 16-4/client/src/components/blocks/render/PasoAPasoBlock.jsx */}
      <div className={styles.pasobotonescontainer}>
        {buttonText && (
          <a
            href={buttonUrl || '#'}
            className={styles.actionButton}
            style={{ backgroundColor: buttonColor || '#007bff' }}
          >
            {buttonText}
          </a>
        )}
      
        {buttonText2 && (
          <a
            className={styles.actionButton2}
            href={buttonUrl2 || '#'}
            style={{ backgroundColor: buttonColor2 || '#dfd8c7' }}
          >
            {buttonText2}
          </a>
        )}
      </div>

    </div>
  );
};

export default PasoAPasoBlock;
