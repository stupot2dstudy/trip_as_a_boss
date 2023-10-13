// fileUploadRoute.js

import express from 'express';
import { processFileUpload } from '../controllers/fileUploadController.js';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware.js';
import path from 'path';

const fileUploadRoute = express.Router();

// Handle POST requests to '/upload' using the fileUploadMiddleware and processFileUpload controller
fileUploadRoute.post('/upload', fileUploadMiddleware, processFileUpload);

// Handle GET requests to '/upload' for displaying an HTML form
fileUploadRoute.get('/upload', (req, res) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const htmlFilePath = path.join(__dirname, '../public/uploadavatar.html');
    res.sendFile(htmlFilePath);
});

export default fileUploadRoute;
