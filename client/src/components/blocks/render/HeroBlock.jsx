import React from 'react';
import DOMPurify from 'dompurify';
import styles from "./styles/heroBlock.module.css";

const HeroBlock = ({ configuration }) => {
  const backgroundStyle = configuration?.image 
    ? { backgroundImage: `url(${configuration.image})` } 
    : { backgroundColor: configuration?.backgroundColor || '#ffffff' };

  const subtitleHTML = configuration?.subtitle || 'Subtítulo del hero';

  return (
    <div className={styles.previewHero} style={backgroundStyle}>
      {/* Renderizar múltiples manchas */}
      {configuration.blobs?.map((blob, index) => {
  // Decidir si va a la izquierda o derecha
  const side = index % 2 === 0 ? '1%' : '80%';
  const topPos = Math.random() * 80; // Porcentaje vertical

  return (
    <img
      key={index}
      src={blob}
      alt={`Mancha decorativa ${index + 1}`}
      className={styles.blob}
      style={{
        top: `${topPos}%`,
        left: side
      }}
    />
  );
})}


      <div className={styles.heroContent}>
        {configuration?.title &&( <div className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.title) }} ></div> )}
        
        <p 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitleHTML) }} 
        />

{configuration?.buttonText1 && (
        <div className={styles.buttonContainer}>
          {configuration?.buttonText1 && (
            <a 
              href={configuration?.buttonUrl1 || '#'} 
              className={styles.heroButton}
              style={{ backgroundColor: configuration?.buttonColor1 || '#007bff' }}
            >
              {configuration.buttonText1}
            </a>
          )}
          {configuration?.buttonText2 && (
            <a 
              href={configuration?.buttonUrl2 || '#'} 
              className={styles.heroButton2}
              style={{ backgroundColor: configuration?.buttonColor2 || '#007bff' }}
            >
              {configuration.buttonText2}
            </a>
          )}
          {configuration?.buttonText3 && (
            <a 
              href={configuration?.buttonUrl3 || '#'} 
              className={styles.heroButton3}
              style={{ backgroundColor: configuration?.buttonColor3 || '#007bff' }}
            >
              {configuration.buttonText3}
            </a>
          )}
        </div>
)}
        
      </div>
    </div>
  );
};

export default HeroBlock;