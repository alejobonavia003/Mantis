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

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await axios.get('/api/metrics');
      //console.log('Datos recibidos del backend:', response.data);
      //console.log(response.data);
      setMetrics(response.data);
    };

    fetchMetrics();
  }, []);

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
      <div>
        <h3 className="metrics-panel__subtitle">Solicitudes de sesión</h3>
        <table className="metrics-panel__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Leído</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {metrics.request ? metrics.request.map((request) => (
    <tr key={request.id} className={request.read ? 'metrics-panel__row--read' : ''}>
      <td>{request.id}</td>
      <td>{request.description}</td>
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
              <th>Leído</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {metrics.order ? metrics.order.map((order) => (
    <tr key={order.id} className={order.read ? 'metrics-panel__row--read' : ''}>
      <td>{order.id}</td>
      <td>{order.description}</td>
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
