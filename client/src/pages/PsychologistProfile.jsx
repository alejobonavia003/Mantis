import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PsychologistProfile = () => {
  const { slug } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
              {psychologist.reseñas.length > 0 ? (
                psychologist.reseñas.map((reseña, index) => (
                  <div key={index} className="review">
                    <div className="reviewHeader">
                      <span className="reviewAuthor">{reseña.usuario}</span>
                      <div className="rating">
                        {'★'.repeat(reseña.rating)}{'☆'.repeat(5 - reseña.rating)}
                      </div>
                    </div>
                    <p className="reviewText">{reseña.comentario}</p>
                  </div>
                ))
              ) : (
                <p className="noReviews">Aún no hay reseñas</p>
              )}
            </section>

        
      </div>
    </div>
  );
};

export default PsychologistProfile;