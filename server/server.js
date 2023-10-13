// server.js

// Import required modules and functions
import express from 'express';
import path from 'path'; // Import the 'path' module
import bodyParser from 'body-parser';
import { initializeDatabase } from './src/db/db_init.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { notFoundMiddleware } from './src/middlewares/notFoundMiddleware.js';
import registerRoute from './src/routes/registerRoute.js';
import successRoute from './src/routes/successRoute.js';
import protectedResourceRoute from './src/routes/protectedResourceRoute.js';
import loginRoute from './src/routes/loginRoute.js';
import getUserRouter from './src/routes/getUserRouter.js';
import recommendationRouter from './src/routes/recommendationsRouter.js';
import fileUploadRoute from './src/routes/fileUploadRoute.js';
import cors from 'cors';
import authTokenRouter from './src/routes/authTokenRouter.js';
import extractQueryParameters from './src/middlewares/queryParamMiddleware.js';
import { portServer } from './config.js';

const app = express();

// Get the current directory name using Node.js modules
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'dist')));

// Enable CORS for all routes or specify the origin of your React app.
// Use the CORS middleware from corsConfig.js
app.use(cors());

// Configure middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Use the defined routes by mounting them as middleware
app.use(registerRoute);
app.use(loginRoute);
app.use(getUserRouter);
app.use(successRoute);
app.use(protectedResourceRoute);

// Use the recommendation router for routing recommendations
app.use(recommendationRouter);

app.use(authTokenRouter);

// IN PROGRESS: Use the file upload route (Note: Make sure this route is correctly configured)
app.use(fileUploadRoute); // Error during file upload: TypeError: Cannot read properties of undefined (reading 'writeFile')

// Use the queryParamMiddleware function
app.use(extractQueryParameters);

// Handle 404 errors using custom middleware
app.use(notFoundMiddleware);

// Initialize the database
initializeDatabase();

// Start the server and listen on the specified port
app.listen(portServer, () => {
    console.log(`Server is running on port ${portServer}`);
});
