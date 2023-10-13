// protectedResourceRoute.js

// Import the required modules and functions
import express from 'express'; // Import the Express framework
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'; // Import the authenticationMiddleware

// Create an instance of an Express router for protected resource routes
const router = express.Router();

// Define a route for a protected resource that requires user authentication using the authenticationMiddleware
router.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' });
});

// Export the router for use in other parts of your application
export default router;
