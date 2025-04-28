import Visit from '../models/Visit.mjs';
import Request from '../models/Request.mjs';
import Order from '../models/Order.mjs';

export const registerVisit = async (req, res) => {
  try {
   // console.log('Registering visit:', req.body);
    const visit = new Visit({
      date: new Date(), // Fecha actual
      count: 1,         // Siempre 1 visita nueva
      ...req.body       // Si en algún caso vienen más campos, se agregan
    });
    await visit.save();
    res.status(200).json({ message: 'Visita registrada' });
  } catch (error) {
    console.error('Error registering visit:', error);
    res.status(500).json({ message: 'Error al registrar la visita' });
  }
};

export const registerRequest = async (req, res) => {
  try {
   // console.log('Registering request:', req.body);
    const request = new Request(req.body);
    await request.save();
    res.status(200).json({ message: 'Solicitud registrada' });
  } catch (error) {
    console.error('Error registering request:', error);
    res.status(500).json({ message: 'Error al registrar la solicitud' });
  }
};

export const registerOrder = async (req, res) => {
  try {
   // console.log('Registering order:', req.body);
    const order = new Order(req.body);
    await order.save();
    res.status(200).json({ message: 'Pedido registrado' });
  } catch (error) {
    console.error('Error registering order:', error);
    res.status(500).json({ message: 'Error al registrar el pedido' });
  }
};

export const getMetrics = async (req, res) => {
  try {
   // console.log('Getting metrics');
    const visits = await Visit.findAll();
    const request = await Request.findAll();
    const order = await Order.findAll();
    res.status(200).json({ visits, request, order });
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ message: 'Error al obtener las métricas' });
  }
};


async function markRequestAsRead(req, res) {
  try {
      const id = req.params.id;
      const request = await Request.findByPk(id);  // Buscar por clave primaria
      if (!request) {
          return res.status(404).json({ message: 'Solicitud no encontrada' });
      }
      request.read = true;      // Marcar como leído
      await request.save();     // Guardar cambios en la base de datos
      return res.json({ message: 'Solicitud marcada como leída correctamente' });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

// Controlador para marcar una orden como leída
async function markOrderAsRead(req, res) {
  try {
      const id = req.params.id;
      const order = await Order.findByPk(id);  // Buscar por clave primaria
      if (!order) {
          return res.status(404).json({ message: 'Orden no encontrada' });
      }
      order.read = true;       // Marcar como leído
      await order.save();      // Guardar cambios en la base de datos
      return res.json({ message: 'Orden marcada como leída correctamente' });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}
export { markRequestAsRead, markOrderAsRead };