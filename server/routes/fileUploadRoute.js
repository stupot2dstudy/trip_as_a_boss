import express from 'express';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware.js'; // Adjust the path as needed

const fileUploadRoute = express.Router();

fileUploadRoute.post('/upload', fileUploadMiddleware, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Access the uploaded file data from req.file
        const uploadedFile = req.file;

        // Example: Save the uploaded file to a storage location (e.g., disk storage)
        // You can use libraries like 'fs' to handle file operations
        // Make sure to customize the storage path and file naming as needed
        const storagePath = 'uploads/'; // Define the storage directory
        const fileName = `${Date.now()}_${uploadedFile.originalname}`;
        const filePath = `${storagePath}${fileName}`;

        // Save the file to the specified storage path
        // In this example, we're using the 'fs' module to write the file
        const fs = require('fs');
        fs.writeFileSync(filePath, uploadedFile.buffer);

        // Respond with a success message
        res.status(200).json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

export default fileUploadRoute;
