import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import styles from "./styles/preguntasLargas.module.css";

const PreguntasLargasBlock = ({ configuration }) => {

    return (
        <div className={styles.largaContainer}>
            <div className={styles.preguntaSection}>
                <div className={styles.leftColumn}>
                    <h2
                        className={styles.preguntaTitle}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.pregunta1) }}
                    />
                    <p
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.parrafo1) }}
                    />
                    <p
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.parrafo2) }}
                    />
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.recuadro}>
                        <p
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.recuadro) }}
                        />
                    </div>
                </div>
            </div>


            <hr className={styles.largaline} />

            <div className={styles.pregunta2Section}>
                <h2
                    className={styles.preguntaTitle}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.pregunta2) }}
                />

                <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.parrafo3) }}
                />
                <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.parrafo4) }}
                />
                <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(configuration?.parrafo5) }}
                />

                <div className={styles.botonescontainer}>
                {configuration?.buttonText2 && (
                                        <a
                                        className={styles.largabutton}
                                        href={configuration?.buttonUrl2 || '#'}
                                        style={{ backgroundColor: configuration?.buttonColor2 || '' }}
                                    >
                                        {configuration?.buttonText2 || 'Solicitar una sesión'}
                                    </a>
                
                )}

                {configuration?.buttonText3 && (
                                     <a
                        className={styles.largabutton3}
                        href={configuration?.buttonUrl3 || '#'}
                        style={{ backgroundColor: configuration?.buttonColor3 || '' }}
                    >
                        {configuration?.buttonText3 || 'Solicitar una sesión'}
                    </a>   
                )}



                </div>

            </div>



        </div>
    );
};

export default PreguntasLargasBlock;