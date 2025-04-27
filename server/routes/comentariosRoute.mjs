import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Obtener reseñas de Google Places
router.get('/', async (req, res) => {
    try {
  
        const apiKey = process.env.API_KEY;
        const placeId = process.env.PLACE_ID;

        if (!apiKey || !placeId) {
            return res.status(500).json({ error: "Faltan variables de entorno" });
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es`;

        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            return res.status(400).json({ error: response.data.error_message || "Error al obtener reseñas" });
        }
        res.json(response.data.result.reviews || []);
    

    } catch (error) {
        console.error("Error al obtener reseñas:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
