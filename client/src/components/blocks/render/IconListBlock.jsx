import React from 'react';
import styles from './styles/iconListBlock.module.css';
import DOMPurify from 'dompurify';

const IconListBlock = ({ configuration }) => {
  const getIconForIndex = (index) => {
    if (!configuration?.icons?.length) return null;
    return configuration.icons[index % configuration.icons.length];
  };

  return (
    <div className={styles.iconListContainer} style={{ backgroundColor: configuration?.backgroundColor || '#ffffff' }}>

      <div className={styles.contenedordelsubtitulo}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description) }} />




      <div
        className={styles.iconListContainer}

      >
        <ul className={styles.stainGrid}>
          {configuration?.items?.map((item, index) => (
            item.text && (
              <li
                key={index}
                className={styles.stainItem}
                style={{ backgroundImage: `url(${getIconForIndex(index)})` }}
              >
                <div className={styles.stainContent}>
                  <div
                    className={styles.itemText}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
                  />
                </div>
              </li>
            )
          ))}
          {/* Placeholder para estructura responsive  <li className={styles.stainPlaceholder}></li> */}

        </ul>
      </div>




      <div className={styles.contenedordelsubtitulo}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description2) }} />

      <div className={styles.contenedordelsubtitulo}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description3) }} />

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
      </div>


    </div>


  );
};

export default IconListBlock;
