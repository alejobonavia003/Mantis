import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const deleteLimits = {}; // Objeto en memoria para rastrear eliminaciones por día


// Función auxiliar para intentar eliminar un recurso como image, video o raw
const tryDelete = async (public_id) => {
  const types = ['image', 'video', 'raw'];
  for (const type of types) {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: type,
      invalidate: true,
    });

    if (result.result === 'ok' || result.result === 'not found') {
      return { type, result };
    }
  }

  throw new Error('No se pudo eliminar el recurso');
};


// Configurar Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Usar multer con almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads' });

// Endpoint para subir una imagen a Cloudinary
router.post('/', upload.single('image'), async (req, res) => {

  try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Mantis-APP'  // Especificamos la carpeta donde se subirá la imagen
      });
      res.status(200).json(result);
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

});

// Endpoint GET para listar las imágenes subidas a Cloudinary
router.get('/', async (req, res) => {
  try {
    // Realiza una búsqueda de imágenes en el folder 'mi_tienda'
    const result = await cloudinary.search
      .expression('folder:Mantis-APP')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();
    
    // Extrae la información relevante de cada recurso
    const images = result.resources.map(resource => ({
      url: resource.secure_url,
      public_id: resource.public_id
    }));
    
    res.json(images);
  } catch (error) {
    console.error("Error al obtener imágenes de Cloudinary:", error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});


// Endpoint para eliminar una imagen en Cloudinary usando su public_id
router.delete('/:public_id', async (req, res) => {
  const userIp = req.ip; // Usamos la IP del usuario como identificador
  const today = new Date().toISOString().split('T')[0]; // Fecha actual (YYYY-MM-DD)

  // Inicializar el contador si no existe
  if (!deleteLimits[userIp]) {
    deleteLimits[userIp] = {};
  }
  if (!deleteLimits[userIp][today]) {
    deleteLimits[userIp][today] = 0;
  }

  // Verificar si el usuario ha alcanzado el límite
  if (deleteLimits[userIp][today] >= 10) {
    return res.status(429).json({
      error: 'Has alcanzado el límite de 10 imágenes eliminadas por día.',
    });
  }

  let { public_id } = req.params;

  if (public_id.startsWith('Mantis-APP/')) {
    public_id = public_id.replace('Mantis-APP/', '');
  }

  try {
    const { type, result } = await tryDelete(`Mantis-APP/${public_id}`);
    deleteLimits[userIp][today] += 1; // Incrementar el contador
    res.json({ message: `Imagen eliminada como tipo ${type}`, result });
  } catch (error) {
    console.error('Error al eliminar imagen en Cloudinary:', error);
    res.status(500).json({ error: 'Error al eliminar la imagen', details: error.message });
  }
});

export default router;
