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
  const [metrics, setMetrics] = useState({ visits: [], requests: [], orders: [] });

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await axios.get('/api/metrics');
      setMetrics(response.data);
    };

    fetchMetrics();
  }, []);

  const markAsRead = async (type, id) => {
    await axios.post(`/api/${type}/${id}/read`);
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [type]: prevMetrics[type].map((item) =>
        item.id === id ? { ...item, read: true } : item
      ),
    }));
  };

  const visitsData = {
    labels: metrics.visits ? metrics.visits.map((visit) => visit.date) : [],
    datasets: [
      {
        label: 'Visitas',
        data: metrics.visits ? metrics.visits.map((visit) => visit.count) : [],
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
            {metrics.requests ? metrics.requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.description}</td>
                <td>{request.read ? 'Sí' : 'No'}</td>
                <td>
                  <button className="metrics-panel__mark-as-read-btn" onClick={() => markAsRead('requests', request.id)}>Marcar como leído</button>
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
            {metrics.orders ? metrics.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.description}</td>
                <td>{order.read ? 'Sí' : 'No'}</td>
                <td>
                  <button className="metrics-panel__mark-as-read-btn" onClick={() => markAsRead('orders', order.id)}>Marcar como leído</button>
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
        <p className="metrics-panel__total-visits">Total de Visitas: {metrics.visits ? metrics.visits.reduce((acc, visit) => acc + visit.count, 0) : 0}</p>
      </div>
    </div>
  );
};

export default MetricsPanel;
