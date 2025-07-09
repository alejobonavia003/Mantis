import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


// Registrar los componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const MetricsPanel = () => {
  const [metrics, setMetrics] = useState({ visits: [], request: [], order: [] });
  const [psychologists, setPsychologists] = useState([]);
  const [showPsList, setShowPsList] = useState(false);
  const [selectedPs, setSelectedPs] = useState(null);
  const [reviewLink, setReviewLink] = useState(null);
  const [reviewExpiresAt, setReviewExpiresAt] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewTimeoutId, setReviewTimeoutId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await axios.get('/api/metrics');
      setMetrics(response.data);
    };
    fetchMetrics();
  }, []);

  // Cargar psicólogos para el generador de links
  useEffect(() => {
    if (!showPsList) return;
    const fetchPs = async () => {
      try {
        const res = await axios.get(`${apiUrl}api/psychologists`);
        setPsychologists(res.data);
      } catch (err) {
        setReviewError('Error al cargar psicólogos');
      }
    };
    fetchPs();
  }, [showPsList]);
  // Generar link de reseña para psicólogo
  const handleGenerateReviewLink = async (psychologistId) => {
    setReviewLoading(true);
    setReviewError('');
    setReviewLink(null);
    setReviewExpiresAt(null);
    if (reviewTimeoutId) clearTimeout(reviewTimeoutId);
    try {
      const res = await axios.post(`${apiUrl}api/psychologists/${psychologistId}/review-link`);
      setReviewLink(res.data.link);
      setReviewExpiresAt(res.data.expiresAt);
      // Limpiar el link después de 74 horas
      const timeout = setTimeout(() => {
        setReviewLink(null);
        setReviewExpiresAt(null);
      }, 74 * 60 * 60 * 1000);
      setReviewTimeoutId(timeout);
    } catch (err) {
      setReviewError('Error generando link de reseña');
    } finally {
      setReviewLoading(false);
    }
  };

  const markAsRead = async (type, id) => {
    try {
      await axios.post(`/api/metrics/${type}/${id}/read`);

      setMetrics((prevMetrics) => {
        if (!prevMetrics[type]) {
          console.error(`Tipo inválido: ${type}`);
          //console.log('Estado actual de metrics:', prevMetrics);
          return prevMetrics; // Retorna el estado anterior si el tipo no es válido
        }

        return {
          ...prevMetrics,
          [type]: prevMetrics[type].map((item) =>
            item.id === id ? { ...item, read: true } : item
          ),
        };
      });
    } catch (error) {
      console.error(`Error al marcar como leído: ${error}`);
    }
  };
  


  const visitCounts = metrics.visits && metrics.visits.length > 0
  ? metrics.visits.reduce((acc, visit) => {
      const date = new Date(visit.date).toLocaleDateString(); // <--- USAR visit.date, NO createdAt
      acc[date] = (acc[date] || 0) + visit.count; // <--- usar visit.count
      return acc;
    }, {})
  : {};

  const visitsData = {
    labels: Object.keys(visitCounts),
    datasets: [
      {
        label: 'Visitas',
        data: Object.values(visitCounts),
        fill: false,
        backgroundColor: '#516f61',
        borderColor: '#516f61',
      },
    ],
  };

  return (
    <div className="metrics-panel">
      {/* Generador de links de reseña */}
      <div style={{ marginBottom: 24 }}>
        <button
          className="metrics-panel__review-link-btn"
          style={{ marginBottom: 8 }}
          onClick={() => setShowPsList((v) => !v)}
        >
          {showPsList ? 'Ocultar generador de link de reseña' : 'Generar link de reseña'}
        </button>
        {showPsList && (
          <div className="metrics-panel__review-link-box">
            <label htmlFor="ps-select" className="metrics-panel__review-link-label">Selecciona un psicólogo:</label>
            <select
              id="ps-select"
              className="metrics-panel__review-link-select"
              value={selectedPs || ''}
              onChange={e => setSelectedPs(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {psychologists.map(ps => (
                <option key={ps.id} value={ps.id}>{ps.nombre}</option>
              ))}
            </select>
            <button
              className="metrics-panel__review-link-btn"
              onClick={() => selectedPs && handleGenerateReviewLink(selectedPs)}
              disabled={!selectedPs || reviewLoading}
            >
              {reviewLoading ? 'Generando...' : 'Generar link'}
            </button>
            {reviewError && <div className="metrics-panel__review-link-error">{reviewError}</div>}
            {reviewLink && (
              <div style={{ marginTop: 12 }}>
                <input
                  type="text"
                  className="metrics-panel__review-link-input"
                  value={reviewLink}
                  readOnly
                  onFocus={e => e.target.select()}
                />
                <span className="metrics-panel__review-link-expiry">
                  Este link se eliminará automáticamente en 74 horas.<br />
                  Expira: {new Date(reviewExpiresAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <h3 className="metrics-panel__subtitle">Solicitudes de sesión</h3>
        <table className="metrics-panel__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Solicitado a</th>
              <th>Leído</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {metrics.request ? metrics.request.map((request) => (
    <tr key={request.id} className={request.read ? 'metrics-panel__row--read' : ''}>
      <td>{request.id}</td>
      <td>{request.description}</td>
      <td>{request.psychologist || '-'}</td>
      <td>{request.read ? 'Sí' : 'No'}</td>
      <td>
        {!request.read && (
          <button
            className="metrics-panel__mark-as-read-btn"
            onClick={() => markAsRead('request', request.id)}
          >
            Marcar como leído
          </button>
        )}
      </td>
    </tr>
  )) : null}
</tbody>
        </table>
      </div>
      <div>
        <h3 className="metrics-panel__subtitle">Pedidos de Materiales</h3>
        <table className="metrics-panel__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Material</th>
              <th>Leído</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {metrics.order ? metrics.order.map((order) => (
    <tr key={order.id} className={order.read ? 'metrics-panel__row--read' : ''}>
      <td>{order.id}</td>
      <td>{order.description}</td>
      <td>{order.material || '-'}</td>
      <td>{order.read ? 'Sí' : 'No'}</td>
      <td>
        {!order.read && (
          <button
            className="metrics-panel__mark-as-read-btn"
            onClick={() => markAsRead('order', order.id)}
          >
            Marcar como leído
          </button>
        )}
      </td>
    </tr>
  )) : null}
</tbody>
        </table>
      </div>
      <div>
        <h3 className="metrics-panel__subtitle">Visitas de la Página</h3>
        <div className="metrics-panel__chart-container">
          <Line data={visitsData} />
        </div>
        <p className="metrics-panel__total-visits">
  Total de Visitas: {metrics.visits && metrics.visits.length > 0
    ? metrics.visits.reduce((acc, visit) => acc + visit.count, 0)
    : 0}
</p>
      </div>
    </div>
  );
};

export default MetricsPanel;
