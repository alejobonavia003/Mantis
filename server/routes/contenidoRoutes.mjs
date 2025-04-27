import express from 'express';
const router = express.Router();
import Contenido from '../models/Contenido.mjs';

//get http://localhost:5000/api/contenidos devuelve todos los contenidos
router.get('/', async (req, res) => {
  try {
    const contenidos = await Contenido.findAll();
    res.json(contenidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener contenidos del header." });
  }
});

//get http://localhost:5000/api/:clave devuelve un contenido por clave
router.get('/:clave', async (req, res) => {
  try {
    const contenido = await Contenido.findOne({ where: { clave: req.params.clave } });
    contenido ? res.json(contenido) : res.status(404).json({ error: "No encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener contenido" });
  }
});

//put http://localhost:5000/api/contenidos actualiza un contenido por clave
router.put('/:clave', async (req, res) => {
  try {
    const [updated] = await Contenido.update(
      { valor: req.body.valor },
      { where: { clave: req.params.clave } }
    );
    updated ? res.json(await Contenido.findOne({ where: { clave: req.params.clave } })) 
            : res.status(404).json({ error: "No encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
});



export default router;