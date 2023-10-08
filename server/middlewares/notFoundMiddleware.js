import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

// Get the current module's directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Determine the absolute path to the notfound404.html file
const notFoundHtmlPath = resolve(__dirname, '../public/notfound404.html');

// Read the content of the custom HTML file
const notFoundHtml = readFileSync(notFoundHtmlPath, 'utf8');

export const notFoundMiddleware = (req, res, next) => {
    // Set the Content-Type header to indicate HTML
    res.setHeader('Content-Type', 'text/html');

    // Send the custom HTML page with a 404 status code
    res.status(404).send(notFoundHtml);
};
