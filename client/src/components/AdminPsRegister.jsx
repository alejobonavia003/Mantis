import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './AdminImageGallery'; // Asumiendo que ya tienes este componente
import PsicologoForm from './PsicologoForm'; // Lo crearemos después

const AdminPsRegister = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewLinks, setReviewLinks] = useState({}); // { [psychologistId]: { link, expiresAt, timeoutId } }
  const [reviews, setReviews] = useState({}); // { [psychologistId]: [ ...reseñas ] }
  const apiUrl = import.meta.env.VITE_API_URL;

  // Cargar psicólogos al montar el componente
  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/psychologists`);
        setPsychologists(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar psicólogos');
        setLoading(false);
      }
    };
    loadPsychologists();
  }, []);

  // Cargar reseñas de un psicólogo. 
  const fetchReviews = async (psychologistId) => {
    try {
      const response = await axios.get(`${apiUrl}api/psychologists/${psychologistId}/reviews`);
      setReviews(prev => ({ ...prev, [psychologistId]: response.data }));
    } catch (err) {
      // Puedes manejar el error si lo deseas
    }
  };

  // Generar link de reseña
  const handleGenerateReviewLink = async (psychologistId) => {
    try {
      const response = await axios.post(`${apiUrl}api/psychologists/${psychologistId}/review-link`);
      const { link, expiresAt } = response.data;
      setReviewLinks(prev => {
        // Si ya hay un timeout, lo limpiamos
        if (prev[psychologistId]?.timeoutId) {
          clearTimeout(prev[psychologistId].timeoutId);
        }
        // Seteamos el nuevo timeout para limpiar el link después de 74 horas
        const timeoutId = setTimeout(() => {
          setReviewLinks(current => ({ ...current, [psychologistId]: undefined }));
        }, 74 * 60 * 60 * 1000); // 74 horas en ms
        return { ...prev, [psychologistId]: { link, expiresAt, timeoutId } };
      });
    } catch (err) {
      alert('Error generando link de reseña');
    }
  };

  // Cargar reseñas al montar o cuando cambia la lista de psicólogos
  useEffect(() => {
    psychologists.forEach(psychologist => {
      fetchReviews(psychologist.id);
    });
  }, [psychologists]);

  // Manejar creación/actualización
  const handleSubmit = async (formData) => {
    try {
      let response;
      if (selectedPsychologist) {
        response = await axios.put(
          `${apiUrl}api/psychologists/${selectedPsychologist.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
          }
        );
        setPsychologists(prev =>
          prev.map(p => p.id === response.data.id ? response.data : p)
        );
      } else {
        response = await axios.post(
          `${apiUrl}api/psychologists`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
          }
        );
        setPsychologists(prev => [...prev, response.data]);
      }
      setSelectedPsychologist(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar los cambios');
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este psicólogo?')) return;

    try {
      await axios.delete(`${apiUrl}api/psychologists/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setPsychologists(prev => prev.filter(p => p.id !== id));
      setError('');
    } catch (err) {
      setError('Error al eliminar el psicólogo');
    }
  };

  if (loading) return <div>Cargando psicólogos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ps-container">

            <div className="ps-list">
        {psychologists.map(psychologist => (
          <div key={psychologist.id} className="ps-card">
            <div className="ps-card-header">
              <img
                src={psychologist.foto || '/placeholder-user.jpg'}
                alt={psychologist.nombre}
              />
              <div>
                <h4>{psychologist.nombre}</h4>
                <p>{psychologist.oficio}</p>
              </div>
            </div>

            <div className="actions">
              <button
                onClick={() => setSelectedPsychologist(psychologist)}
                className="edit-button"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(psychologist.id)}
                className="delete-button"
              >
                Eliminar
              </button>
              <button
                className="generate-link-button"
                style={{ marginLeft: 'auto' }}
                onClick={() => handleGenerateReviewLink(psychologist.id)}
              >
                Generar link de reseña
              </button>
            </div>

            {/* Casilla de texto para mostrar el link generado */}
            {reviewLinks[psychologist.id]?.link && (
              <div className="review-link-box">
                <input
                  type="text"
                  value={reviewLinks[psychologist.id].link}
                  readOnly
                  style={{ width: '100%', marginTop: 8 }}
                  onFocus={e => e.target.select()}
                />
                <small>Este link se eliminará automáticamente en 74 horas.</small>
              </div>
            )}

            {/* Lista de reseñas */}
            {reviews[psychologist.id] && reviews[psychologist.id].length > 0 && (
              <div className="review-list">
                <h5>Reseñas recibidas:</h5>
                <ul>
                  {reviews[psychologist.id].map((review) => (
                    <li key={review.id}>
                      <span style={{ fontWeight: 'bold' }}>{review.rating ? `★${review.rating}` : ''}</span> {review.content}
                      <span style={{ color: '#888', fontSize: '0.8em', marginLeft: 8 }}>
                        ({new Date(review.createdAt).toLocaleDateString()})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>


<h2>Formulario de registro o edicion de usuario.</h2>
      <PsicologoForm
        onSubmit={handleSubmit}
        initialData={selectedPsychologist}
        onCancel={() => setSelectedPsychologist(null)}
      />


    </div>
  );
};

export default AdminPsRegister;