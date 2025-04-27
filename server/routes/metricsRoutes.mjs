import express from 'express';
import { getMetrics, markRequestAsRead, markOrderAsRead } from '../controllers/metricsController.mjs';

const router = express.Router();

router.get('/metrics', getMetrics);
router.post('/requests/:id/read', markRequestAsRead);
router.post('/orders/:id/read', markOrderAsRead);

export default router;
