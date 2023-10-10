// controllers/fileUploadController.js

// Import required modules and functions
import fs from 'fs/promises'; // File system module for asynchronous file operations
import path from 'path'; // Path module for working with file paths

// Define a function to process file uploads
export const processFileUpload = async (req, res) => {
    try {
        // Check if a file was not uploaded in the request
        if (!req.file) {
            // If no file was uploaded, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get information about the uploaded file
        const uploadedFile = req.file;

        // Get the current module's URL and convert it to a directory path
        const currentModuleUrl = new URL(import.meta.url);
        const currentModuleDir = path.dirname(currentModuleUrl.pathname);

        // Construct the absolute path to the 'fileUpload' directory
        const storagePath = path.join(currentModuleDir, '..', 'public', 'fileUpload');

        // Generate a unique file name based on the current timestamp and the original file name
        const fileName = `${Date.now()}_${uploadedFile.originalname}`;

        // Create the full file path by combining the storage path and the generated file name
        const filePath = path.join(storagePath, fileName);

        // Use 'fs.promises.writeFile' for asynchronous file writing, writing the file's buffer to the specified path
        await fs.promises.writeFile(filePath, uploadedFile.buffer);

        // Respond with a 200 OK status and a success message, including the file path
        res.status(200).json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
        // If an error occurs during file processing, log the error and respond with a 500 Internal Server Error status
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
};
