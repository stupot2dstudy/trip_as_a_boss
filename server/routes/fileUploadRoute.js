// fileUploadRoute.js

import express from 'express'; // Import the Express framework
import { processFileUpload } from '../controllers/fileUploadController.js'; // Import the fileUploadController for handling file uploads
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware.js'; // Import the fileUploadMiddleware for processing file uploads
import path from 'path'; // Import the 'path' module for working with file paths

const fileUploadRoute = express.Router(); // Create an Express router instance for file uploads

// Handle POST requests to '/upload' using the fileUploadMiddleware and processFileUpload controller
fileUploadRoute.post('/upload', fileUploadMiddleware, processFileUpload);

// Handle GET requests to '/upload' for displaying an HTML form
fileUploadRoute.get('/upload', (req, res) => {
    // Get the absolute path to the directory containing this module
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Construct the absolute file path to the HTML file
    const htmlFilePath = path.join(__dirname, '../public/uploadavatar.html');

    // Specify the root directory when sending the HTML file as a response
    res.sendFile(htmlFilePath);
});

export default fileUploadRoute; // Export the fileUploadRoute for use in other parts of your application
