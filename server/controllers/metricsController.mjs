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
    const requests = await Request.findAll();
    const orders = await Order.findAll();
    res.status(200).json({ visits, requests, orders });
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ message: 'Error al obtener las métricas' });
  }
};


export const markRequestAsRead = async (req, res) => {
  try {
   // console.log('Marking request as read:', req.params.id);
    const request = await Request.findById(req.params.id);
    request.read = true;
    await request.save();
    res.status(200).json({ message: 'Solicitud marcada como leída' });
  } catch (error) {
    console.error('Error marking request as read:', error);
    res.status(500).json({ message: 'Error al marcar la solicitud como leída' });
  }
};

export const markOrderAsRead = async (req, res) => {
  try {
   // console.log('Marking order as read:', req.params.id);
    const order = await Order.findById(req.params.id);
    order.read = true;
    await order.save();
    res.status(200).json({ message: 'Pedido marcado como leído' });
  } catch (error) {
    console.error('Error marking order as read:', error);
    res.status(500).json({ message: 'Error al marcar el pedido como leído' });
  }
};
