import express from 'express';
import Product from '../models/products.mjs';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un producto por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});


// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion_corta, descripcion_larga, precio, galeria_imagenes, categoria, stock } = req.body;
    const nuevoProducto = await Product.create({ 
      nombre, 
      descripcion_corta, 
      descripcion_larga, 
      precio, 
      galeria_imagenes, 
      categoria, 
      stock 
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.update({
      ...req.body,
      galeria_imagenes: req.body.galeria_imagenes || []
    });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
