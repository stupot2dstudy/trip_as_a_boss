// notFoundRouter.js

// Import the required modules and functions
import express from 'express';
import { notFoundMiddleware } from './notFoundMiddleware.js';

// Create an instance of an Express router
const notFoundRouter = express.Router();

// Use the 'notFoundMiddleware' function for handling 404 errors
notFoundRouter.use(notFoundMiddleware);

// Export the 'notFoundRouter' for use in other parts of the application
export default notFoundRouter;
