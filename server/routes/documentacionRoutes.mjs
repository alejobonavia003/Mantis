import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo manual.md
const manualMdPath = path.join(__dirname, '../src/doc/manual.md');

// Endpoint para descargar el manual en .md
router.get('/manual', (req, res) => {
  res.download(manualMdPath, 'manual.md', (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo .md no encontrado' });
    }
  });
});

export default router;
