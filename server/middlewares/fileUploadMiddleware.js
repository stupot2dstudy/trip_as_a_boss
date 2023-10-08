// fileUploadMiddleware.js

import multer from 'multer';


// Set up Multer storage and file filtering
const storage = multer.memoryStorage(); // Store files in memory for this example (you can configure it to store files on disk)
const fileFilter = (req, file, cb) => {
    // Define the file types you want to allow
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Allow the file to be uploaded
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false); // Reject the file
    }
};

// Create the Multer middleware with the defined storage and file filter
const upload = multer({ storage, fileFilter });

// Middleware function for handling file uploads
export const fileUploadMiddleware = upload.single('file'); // 'file' is the field name in the form for the file input


