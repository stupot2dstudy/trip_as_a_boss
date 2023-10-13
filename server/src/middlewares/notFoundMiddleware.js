// notFoundMiddleware.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

// Get the current directory using Node.js modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the path to the HTML file for the 404 error page
const notFoundHtmlPath = resolve(__dirname, '../public/notfound404.html');

// Read the contents of the 404 error HTML file
const notFoundHtml = readFileSync(notFoundHtmlPath, 'utf8');

// Define the notFoundMiddleware function
export const notFoundMiddleware = (req, res, next) => {
    // Set the response's content type to 'text/html'
    res.setHeader('Content-Type', 'text/html');

    // Set the HTTP status code to 404 (Not Found)
    res.status(404).send(notFoundHtml);
};

