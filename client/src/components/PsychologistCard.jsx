import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import styles from "./blocks/render/styles/psychologistsCarousel.module.css";

const PsychologistCard = ({ psychologist }) => {
  const [contactActive, setContactActive] = useState(false);
  const toggleContact = () => setContactActive(!contactActive);

  // Generamos la URL para WhatsApp con un mensaje predefinido
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${psychologist.telefono}&text=${encodeURIComponent(
    'Hola, me interesa conocer más sobre tus servicios'
  )}`;

  // URL para Instagram: asumimos que la propiedad "instagram" está disponible en el objeto.
  const instagramUrl = psychologist.instagram
    ? `https://instagram.com/${psychologist.instagram}`
    : '#';

  return (
    <div key={psychologist.id} className={styles.cardWrapper}>
      <div className={styles.cardContentNew}>
        {/* Imagen del psicólogo */}
        <div className={styles.imageContainer}>
          <img 
            src={psychologist.foto} 
            alt={DOMPurify.sanitize(psychologist.nombre)} 
          />
        </div>

        {/* Información básica: nombre, título/oficio y especialización */}
        <div className={styles.cardInfo}>
          <h2>{DOMPurify.sanitize(psychologist.nombre)}</h2>
          <h3>{DOMPurify.sanitize(psychologist.oficio)}</h3>
          <p>{DOMPurify.sanitize(psychologist.especializacion)}</p>
        </div>

        {/* Acciones: Conocer más y Contactar */}
        <div className={styles.cardActions}>
          <Link 
            to={`/psicologos/${psychologist.slug}`} 
            className={styles.moreButton}
          >
            Conocer más
          </Link>
        </div>

  
      </div>
    </div>
  );
};

export default PsychologistCard;
