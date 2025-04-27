import Visit from '../models/Visit.mjs';
import Request from '../models/Request.mjs';
import Order from '../models/Order.mjs';



export const getMetrics = async (req, res) => {
  try {
    const visits = await Visit.findAll();
    const requests = await Request.findAll();
    const orders = await Order.findAll();

    res.json({ visits, requests, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markRequestAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByPk(id);
    if (request) {
      request.read = true;
      await request.save();
      res.json({ message: 'Request marked as read' });
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markOrderAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (order) {
      order.read = true;
      await order.save();
      res.json({ message: 'Order marked as read' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
