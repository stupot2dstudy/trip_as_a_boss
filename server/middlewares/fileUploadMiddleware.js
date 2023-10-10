// fileUploadMiddleware.js

import multer from 'multer'; // Import the Multer library

// Configure Multer storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/fileUpload'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname); // Use a unique filename with the current timestamp
    },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

// Middleware function to handle file uploads
export const fileUploadMiddleware = upload.single('avatar'); // 'avatar' should match the field name in your HTML form
