import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PsychologistProfile = () => {
  const { slug } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState({}); // { [index]: true/false }
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/psychologists/${slug}`);
        setPsychologist(response.data);
        setLoading(false);
      } catch (err) {
        setError('Psicólogo no encontrado');
        setLoading(false);
      }
    };

    fetchPsychologist();
  }, [slug]);

  useEffect(() => {
    if (psychologist && psychologist.id) {
      axios.get(`${apiUrl}api/psychologists/${psychologist.id}/reviews`)
        .then(res => setReviews(res.data))
        .catch(() => setReviews([]));
    }
  }, [psychologist]);

  // Carousel handlers
  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  const handleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profileContainer">
      <div className="header">

        <div className="headerInfo">
          <h1 className="name">{psychologist.nombre}</h1>
          <h2 className="title">{psychologist.oficio}</h2>
          <h2 className="title">{psychologist.especializacion}</h2>
        </div>
      </div>

      <div className="pagePsicologocontent">
        <section className="section">
          <h2 className="sectionTitle">Sobre mí</h2>
          <p className="description">{psychologist.descripcionLarga}</p>
        </section>

        <div className="imagenperfilcontent">
          <img
            src={psychologist.foto}
            alt={psychologist.nombre}
            className="profileImage"
          />
          <div>
            <h2>Para conocerme más</h2>
            <div className="instaRow">
              {/* SVG del logo de Instagram */}
              <img
                src= "/assets/instagram-2016-5.svg"
                alt="Instagram Logo"
                className="instaLogo"
              />
              
              {/* Botón de Instagram */}
              <a
                href={`${psychologist.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="instabutton"
              >
                {psychologist.telefono}
              </a>
            </div>
          </div>
        </div>

              <p className="availability">{psychologist.disponibilidad}</p>



          <div className="column">
            <section className="section">
              <h2 className="sectionTitle">Formación académica y profesional</h2>
              <ul className="list">
                {psychologist.formaciones.map((formacion, index) => (
                  <li key={index} className="listItem">• {formacion}</li>
                ))}
              </ul>
            </section>


          </div>

                  
          <div className="column">


            <section className="section">
              <h2 className="sectionTitle">Te puedo ayudar con:</h2>
              <div className="tags">
                {psychologist.areasAyuda.map((area, index) => (
                  <span key={index} className="tag">{area}</span>
                ))}
              </div>
            </section>
          </div>

          <section className="section">
              <h2 className="sectionTitle">Reseñas</h2>
              {reviews.length > 0 ? (
                <div className="review-carousel">
                  <button className="carousel-btn left" onClick={handlePrev} aria-label="Anterior">&#8592;</button>
                  <div className="carousel-content">
                    {(() => {
                      const reseña = reviews[carouselIndex];
                      const isLong = reseña.content.length > 220;
                      const showFull = expanded[carouselIndex];
                      return (
                        <div className="review">
                          <div className="reviewHeader">
                            <div className="rating">
                              {reseña.rating ? (
                                <>
                                  {Array.from({ length: reseña.rating }).map((_, i) => (
                                    <span key={i} className="star filled">★</span>
                                  ))}
                                  {Array.from({ length: 5 - reseña.rating }).map((_, i) => (
                                    <span key={i} className="star">★</span>
                                  ))}
                                </>
                              ) : null}
                            </div>
                          </div>
                          <p className="reviewText">
                            {isLong && !showFull
                              ? `${reseña.content.slice(0, 220)}...`
                              : reseña.content}
                          </p>
                          {isLong && (
                            <button className="read-more-btn" onClick={() => handleExpand(carouselIndex)}>
                              {showFull ? 'Leer menos' : 'Leer más'}
                            </button>
                          )}
                          <span className="reviewDate">
                            {reseña.createdAt ? new Date(reseña.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                  <button className="carousel-btn right" onClick={handleNext} aria-label="Siguiente">&#8594;</button>
                  <div className="carousel-dots">
                    {reviews.map((_, idx) => (
                      <span
                        key={idx}
                        className={`dot${carouselIndex === idx ? ' active' : ''}`}
                        onClick={() => setCarouselIndex(idx)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="noReviews">Aún no hay reseñas</p>
              )}
            </section>

        
      </div>
    </div>
  );
};

export default PsychologistProfile;