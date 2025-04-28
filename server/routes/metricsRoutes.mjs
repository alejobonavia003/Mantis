import express from 'express';
import { registerVisit, registerRequest, registerOrder, getMetrics, markRequestAsRead, markOrderAsRead } from '../controllers/metricsController.mjs';

const router = express.Router();

router.post('/visit', registerVisit);
router.post('/request', registerRequest);
router.post('/order', registerOrder);
router.get('/', getMetrics);
router.post('/request/:id/read', markRequestAsRead);
router.post('/order/:id/read', markOrderAsRead);

export default router;
