// protectedResourceRoute.js

import express from 'express'; // Import the Express framework
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'; // Import the authenticationMiddleware

const router = express.Router(); // Create an Express router instance for protected resource routes

// Define a route for a protected resource that requires user authentication using the authenticationMiddleware
router.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' });
});

export default router; // Export the router for use in other parts of your application
