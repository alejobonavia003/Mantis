import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './AdminImageGallery'; // Asumiendo que ya tienes este componente
import PsicologoForm from './PsicologoForm'; // Lo crearemos después

const AdminPsRegister = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

      <PsicologoForm
        onSubmit={handleSubmit}
        initialData={selectedPsychologist}
        onCancel={() => setSelectedPsychologist(null)}
      />

      <div className="ps-list">
        <h3>Psicólogos Registrados</h3>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPsRegister;