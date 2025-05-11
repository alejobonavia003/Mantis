import express from 'express';
import {
  generateReviewLink,
  validateReviewToken,
  submitReview,
  getPsychologistReviews
} from '../controllers/reviewController.mjs';

const router = express.Router();

// Generar link temporal para reseña
router.post('/psychologists/:id/review-link', generateReviewLink);

// Validar token y mostrar formulario (puede ser usado por el frontend para validar el token)
router.get('/review/submit/:token', validateReviewToken);

// Guardar reseña y destruir token
router.post('/review/submit/:token', submitReview);

// Listar reseñas de un psicólogo
router.get('/psychologists/:id/reviews', getPsychologistReviews);

export default router;
