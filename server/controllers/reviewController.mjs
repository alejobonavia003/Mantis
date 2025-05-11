import { v4 as uuidv4 } from 'uuid';
import Review from '../models/Review.mjs';
import ReviewToken from '../models/ReviewToken.mjs';
import Psychologist from '../models/Psychologist.mjs';
import { Op } from 'sequelize';

// POST /api/psychologists/:id/review-link
export async function generateReviewLink(req, res) {
  try {
    const psychologistId = req.params.id;
    // Verifica que el psicólogo exista
    const psychologist = await Psychologist.findByPk(psychologistId);
    if (!psychologist) return res.status(404).json({ error: 'Psicólogo no encontrado' });

    // Genera un token único y fecha de expiración (24h)
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const reviewToken = await ReviewToken.create({ psychologistId, token, expiresAt });
    // Devuelve el link completo
    const link = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/review/submit/${token}`;
    res.json({ link, token, expiresAt });
  } catch (err) {
    res.status(500).json({ error: 'Error generando link de reseña' });
  }
}

// GET /api/review/submit/:token
export async function validateReviewToken(req, res) {
  try {
    const { token } = req.params;
    const reviewToken = await ReviewToken.findOne({ where: { token, used: false, expiresAt: { [Op.gt]: new Date() } } });
    if (!reviewToken) return res.status(404).json({ error: 'Token inválido o expirado' });
    res.json({ valid: true, psychologistId: reviewToken.psychologistId });
  } catch (err) {
    res.status(500).json({ error: 'Error validando token' });
  }
}

// POST /api/review/submit/:token
export async function submitReview(req, res) {
  try {
    const { token } = req.params;
    const { content, rating } = req.body;
    const reviewToken = await ReviewToken.findOne({ where: { token, used: false, expiresAt: { [Op.gt]: new Date() } } });
    if (!reviewToken) return res.status(404).json({ error: 'Token inválido o expirado' });
    // Crea la reseña
    await Review.create({ psychologistId: reviewToken.psychologistId, content, rating });
    // Marca el token como usado
    reviewToken.used = true;
    await reviewToken.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error guardando reseña' });
  }
}

// GET /api/psychologists/:id/reviews
export async function getPsychologistReviews(req, res) {
  try {
    const psychologistId = req.params.id;
    const reviews = await Review.findAll({
      where: { psychologistId },
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo reseñas' });
  }
}


