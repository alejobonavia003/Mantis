import express from 'express';
import Psychologist from '../models/Psychologist.mjs';
import sequelize from '../config/db.mjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Middleware de autenticación (implementar según tu sistema)
const authenticate = (req, res, next) => next();

// GET: Listar todos los psicólogos
router.get('/', async (req, res) => {
  try {
    const psychologists = await Psychologist.findAll({
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['reseñas'] } // Excluir reseñas en listado general
    });
    res.json(psychologists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener un psicólogo por slug
router.get('/:slug', async (req, res) => {
  try {
    const psychologist = await Psychologist.findOne({
      where: { slug: req.params.slug }
    });
    
    if (!psychologist) return res.status(404).json({ error: 'Psicólogo no encontrado' });
    res.json(psychologist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear nuevo psicólogo (protegido)
router.post('/', authenticate, async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { nombre, oficio, descripcionCorta, descripcionLarga } = req.body;
    
    if (!nombre || !oficio || !descripcionCorta || !descripcionLarga) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    const newPsychologist = await Psychologist.create({
      ...req.body,
      id: uuidv4()
    }, { transaction });

    await transaction.commit();
    res.status(201).json(newPsychologist);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      error: 'Error al crear psicólogo',
      details: error.errors?.map(e => e.message) || error.message
    });
    console.log(error);
  }
});

// PUT: Actualizar psicólogo (protegido)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const psychologist = await Psychologist.findByPk(req.params.id);
    
    if (!psychologist) {
      return res.status(404).json({ error: 'Psicólogo no encontrado' });
    }
    const updated = await psychologist.update(req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar psicólogo (protegido)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const psychologist = await Psychologist.findByPk(req.params.id);
    
    if (!psychologist) {
      return res.status(404).json({ error: 'Psicólogo no encontrado' });
    }

    await psychologist.destroy();
    res.json({ message: 'Psicólogo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;