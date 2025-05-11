import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewSubmitPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [psychologist, setPsychologist] = useState(null);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get(`${apiUrl}api/review/submit/${token}`);
        setValid(true);
        const psRes = await axios.get(`${apiUrl}api/psychologists/id/${res.data.psychologistId}`);
        setPsychologist(psRes.data);
      } catch (err) {
        setValid(false);
        setError('El link es inválido o ha expirado.');
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}api/review/submit/${token}`, { content, rating });
      setSubmitted(true);
    } catch (err) {
      setError('No se pudo enviar la reseña. Intenta nuevamente.');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!valid) return <div className="error">{error}</div>;
  if (submitted) return <div className="success">¡Gracias por tu reseña!</div>;

  return (
    <div className="review-submit-container">
      <h2>Dejar una reseña {psychologist && `para ${psychologist.nombre}`}</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Reseña:
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            placeholder="Escribe tu experiencia..."
          />
        </label>
        <label>
          Calificación:
          <div className="star-rating" style={{ direction: 'ltr' }}>
            {[5,4,3,2,1].map(val => (
              <span
                key={val}
                className={`star ${val <= (hoverRating || rating) ? 'filled' : ''}`}
                onClick={() => setRating(val)}
                onMouseOver={() => setHoverRating(val)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: val <= (hoverRating || rating) ? '#516f61' : '#9dcdbb',
                }}
                role="button"
                aria-label={`Calificar con ${val} estrellas`}
              >
                ★
              </span>
            ))}
          </div>
        </label>
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default ReviewSubmitPage;
