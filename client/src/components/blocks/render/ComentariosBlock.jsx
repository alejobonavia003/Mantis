import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import styles from "./styles/comentarioBlock.module.css";

const ComentariosBlock = ({ configuration }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(apiUrl+"api/reviews")
      .then(response => response.json())
      .then(data => setReviews(data || []))
      .catch(error => console.error("Error al obtener reseñas:", error));
  }, []);

  const titleHTML = configuration?.title || 'Iniciar un proceso terapéutico online…';
  const subtitleHTML = configuration?.subtitle || 'Tomar la decisión de iniciar terapia lleva tiempo...';

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? reviews.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev === reviews.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className={styles.containerGeneral}>
    <div className={styles.comentariosContainer}>
      <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(titleHTML) }} className={styles.title} />
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitleHTML) }} className={styles.subtitle} />

      <div className={styles.carouselContainer}>
        {/* Badge de Google */}
        <svg className={styles.googleBadge} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M21.35 11.1h-9.17v2.93h5.28c-.23 1.2-.91 2.2-1.94 2.87v2.39h3.15c1.84-1.68 2.91-4.17 2.91-7.19 0-.64-.06-1.26-.17-1.86z"/>
          <path fill="#34A853" d="M12.18 21c2.64 0 4.85-.87 6.46-2.37l-3.15-2.39c-.87.59-1.99.94-3.31.94-2.54 0-4.69-1.71-5.46-4.01H3.23v2.52C4.84 18.76 8.12 21 12.18 21z"/>
          <path fill="#FBBC05" d="M6.72 13.73a5.98 5.98 0 010-3.47V7.74H3.23a9.99 9.99 0 000 8.52l3.49-2.52z"/>
          <path fill="#EA4335" d="M12.18 7.46c1.43 0 2.71.49 3.71 1.45l2.78-2.78C16.99 4.46 14.77 3 12.18 3a9.99 9.99 0 00-8.95 5.74l3.49 2.52C7.49 8.17 9.64 7.46 12.18 7.46z"/>
        </svg>

        <div className={styles.carousel}>
          {reviews.length > 0 ? (
            <>
              <div className={styles.slides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {reviews.map((review, index) => (
                  <a
                    key={index}
                    className={styles.reviewCard}
                    href={review.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.cardHeader}>
                      <img
                        className={styles.profilePhoto}
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className={styles.author}>{review.author_name}</h4>
                    <div className={styles.rating}>
                      {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                    </div>
                    <p className={styles.text}>{review.text}</p>
                  </a>
                ))}
              </div>

              {reviews.length > 1 && (
                <>
                  <button className={styles.prevButton} onClick={goToPrevious}>&#10094;</button>
                  <button className={styles.nextButton} onClick={goToNext}>&#10095;</button>
                  <div className={styles.dots}>
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        className={index === currentIndex ? styles.activeDot : styles.dot}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className={styles.noReviews}>Aún no hay reseñas disponibles.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ComentariosBlock;