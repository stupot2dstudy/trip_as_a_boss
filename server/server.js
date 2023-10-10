// server.js
// Import required modules and functions
import express from 'express'; // Import the Express framework
import bodyParser from 'body-parser'; // Middleware for parsing request bodies
import { initializeDatabase } from './db/db_init.js'; // Import a function to initialize the database
import { fileURLToPath } from 'url'; // Function to convert a file URL to a path
import { dirname } from 'path'; // Function to retrieve the directory name from a path
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'; // Custom middleware for handling 404 errors
import registerRoute from './routes/registerRoute.js'; // Import the route for registration
import successRoute from './routes/successRoute.js'; // Import the route for success
import protectedResourceRoute from './routes/protectedResourceRoute.js'; // Import the route for protected resources
import loginRoute from './routes/loginRoute.js'; // Import the route for login
import recommendationRouter from './routes/recommendationsRouter.js'; // Import the route for recommendations
import fileUploadRoute from './routes/fileUploadRoute.js'; // Import the route for file uploads (IN PROGRESS)

// Create an instance of the Express application
const app = express();

// Get the current directory name using Node.js modules
const __dirname = dirname(fileURLToPath(import.meta.url));

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
app.use(successRoute);
app.use(protectedResourceRoute);

// Use the recommendation router for routing recommendations
app.use(recommendationRouter);

// IN PROGRESS: Use the file upload route (Note: Make sure this route is correctly configured)
app.use(fileUploadRoute); // Error during file upload: TypeError: Cannot read properties of undefined (reading 'writeFile')

// Handle 404 errors using custom middleware
app.use(notFoundMiddleware);

// Initialize the database
initializeDatabase();

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
