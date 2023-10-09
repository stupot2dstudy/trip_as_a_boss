import express from 'express';
import { createRecommendation, getRecommendations } from '../db/queries/recommendations.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Create a new recommendation (POST request)
router.post('/recommendations', createRecommendation);

// Retrieve recommendations in JSON format
router.get('/recommendations/json', getRecommendations);

// Serve the HTML page when accessing the /recommendations endpoint
router.get('/recommendations', (req, res) => {
    const htmlFilePath = path.join(__dirname, '../public/recommendation.html');
    res.sendFile(htmlFilePath);
});

export default router;
