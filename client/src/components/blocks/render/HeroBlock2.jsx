import React from 'react';
import styles from "./styles/heroBlock2.module.css";
import DOMPurify from 'dompurify';

const HeroBlock2 = ({ configuration }) => {
  const backgroundStyle = configuration?.fondo 
    ? { backgroundImage: `url(${configuration.fondo})` } 
    : { backgroundColor: configuration?.backgroundColor || '#ffffff' };

  return (
    <div className={styles.previewHero} style={backgroundStyle}>
      <div className={styles.heroImageContainer}>
        <img 
          src={DOMPurify.sanitize(configuration?.image)} 
          alt="imagen-hero2" 
          className={styles.imagenhero2} 
        />
      </div>
      <div className={styles.heroContent}>
        <h2 className={styles.heroTitle}  >{configuration?.title || 'Título del hero'}</h2>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.subtitle || 'Subtítulo del hero') }}></p>
        
        <div className={styles.buttonContainer}>
          {configuration?.buttonText1 && (
            <a 
              href={DOMPurify.sanitize(configuration?.buttonUrl1 || '#')} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor1 || '#007bff' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.buttonText1) }}
            />
          )}

          {configuration?.buttonText2 && (
            <a 
              href={DOMPurify.sanitize(configuration?.buttonUrl2 || '#')} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor2 || '#007bff' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.buttonText2) }}
            />
          )}

          {configuration?.buttonText3 && (
            <a 
              href={DOMPurify.sanitize(configuration?.buttonUrl3 || '#')} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor3 || '#007bff' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration.buttonText3) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBlock2;
