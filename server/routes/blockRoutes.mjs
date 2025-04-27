// routes/blockRoutes.js
import express from 'express';
import Block from "../models/Block.mjs";
import sequelize from '../config/db.mjs';
const router = express.Router();

// Middleware de autenticación (debes implementarlo)
// router.use(authMiddleware);

// GET: Listar bloques por página
router.get('/', async (req, res) => {
  try {
    const whereClause = {};
    
    // Filtrar por página si viene en query params
    if (req.query.page) {
      whereClause.page = req.query.page;
    }

    const blocks = await Block.findAll({
      where: whereClause,
      order: [['orderIndex', 'ASC']]
    });
    
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear bloque con gestión de orden
router.post('/', async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { type, page = 'home', configuration = {} } = req.body;

    if (!type) {
      await transaction.rollback();
      return res.status(400).json({ error: "El tipo de bloque es requerido" });
    }

    // Obtener último orderIndex de la misma página
    const lastBlock = await Block.findOne({
      where: { page },
      order: [['orderIndex', 'DESC']],
      transaction
    });

    const newOrderIndex = (lastBlock?.orderIndex || 0) + 1;

    const newBlock = await Block.create({
      type,
      page,
      configuration,
      orderIndex: newOrderIndex
    }, { transaction });

    await transaction.commit();
    res.status(201).json(newBlock);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      error: 'Error al crear bloque',
      details: error.errors?.map(e => e.message) || error.message
    });
  }
});

// actualizacion masiva de bloques
router.put('/bulk-update', async (req, res) => {
  try {
    const transaction = await sequelize.transaction();
    
    const updatePromises = req.body.blocks.map(block => 
      Block.update(
        { orderIndex: block.orderIndex },
        { where: { id: block.id }, transaction }
      )
    );

    await Promise.all(updatePromises);
    await transaction.commit();
    
    res.json({ message: 'Orden actualizado exitosamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});

// PUT: Actualizar bloque (versión simplificada)
router.put('/:id', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    
    if (!block) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }

    // Actualizar solo los campos permitidos
    const updatedBlock = await block.update({
      configuration: req.body.configuration,
      orderIndex: req.body.orderIndex,
      page: req.body.page
    });

    res.json(updatedBlock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar bloque (versión simplificada)
router.delete('/:id', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    
    if (!block) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }

    await block.destroy();
    res.json({ message: 'Bloque eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;