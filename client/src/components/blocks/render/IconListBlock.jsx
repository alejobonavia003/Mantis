import React from 'react';
import styles from './styles/iconListBlock.module.css';
import DOMPurify from 'dompurify';//

const IconListBlock = ({ configuration }) => {
  const getIconForIndex = (index) => {
    if (!configuration?.icons?.length) return null;
    return configuration.icons[index % configuration.icons.length];
  };

  return (
    <div className={styles.iconListContainer} style={{ backgroundColor: configuration?.backgroundColor || '#ffffff', position: 'relative' }}>
      <div className={styles.contenedordelsubtitulo}
        style={{ backgroundColor: 'transparent' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description) }} />
      <div className={styles.contenedordelsubtitulo}
        style={{ backgroundColor: 'transparent' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description2) }} />


      <div className={styles.iconListContainerbajo}>
        {/* Reemplazo de la lista de iconos por una imagen */}
        <img
          src="/iconList.png"
          alt="Lista de iconos decorativa"
          className={styles.iconListImg}
        />
        {/*
        <ul className={styles.stainGrid}>
          <img
            src="https://res.cloudinary.com/dwgzidiha/image/upload/v1748366941/Mantis-APP/duc1qs7v20xdm1iz9bsm.png"
            alt="Pincelada decorativa"
            className={styles.stainBg}
            style={{
              mixBlendMode: 'multiply',
              width: '180%',
              left: '-10%',
              maxWidth: 'none',
              minWidth: '1200px',
              zIndex: 0,
            }}
          />
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
        </ul>
        */}
      </div>

            <div className={styles.contenedordelsubtitulo}
        style={{ backgroundColor: 'transparent' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.description3) }} />

      <div className={styles.buttonContainer}>
        {configuration?.buttonText1 && (
          <a
            href={configuration?.buttonUrl1 || '#'}
            className={styles.heroButton}
            style={configuration?.buttonColor1 ? { backgroundColor: configuration.buttonColor1 } : {}}
          >
            {configuration.buttonText1}
          </a>
        )}
      </div>
      <hr className={styles.separatorLine} />
    </div>
  );
};

export default IconListBlock;
