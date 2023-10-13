// loginRoute.js

// Import necessary modules and functions
import express from 'express';
import jwt from 'jsonwebtoken';
import { loginUser } from '../db/queries/userLogin.js';
import { authenticationMiddleware, comparePasswords } from '../middlewares/authenticationMiddleware.js';
import { secretKey } from '../../config.js';

// Create an instance of an Express router
const loginRoute = express.Router();

// Login route
loginRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; // Extract the username and password from the request body

        // Call the loginUser function to check if the user exists and the password is correct
        const user = await loginUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Login failed. Check your username and password.' }); // Respond with a 401 status if login fails
        }

        // User is authenticated
        res.status(200).json({ message: 'Login successful', user }); // Respond with a 200 status and a success message
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' }); // Handle errors and respond with a 500 status
    }
});

// Protected route
loginRoute.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' }); // Respond with a protected resource message if the user is authenticated
});

// Export the login router for use in other parts of the application
export default loginRoute;
