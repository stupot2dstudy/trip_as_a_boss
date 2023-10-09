// registerRoute.js

import express from 'express';
import { registerUser } from '../db/queries/userRegistration.js'; // Import the registerUser function
import { registrationSchema } from '../db/queries/validation.js'; // Import the Joi schema

const registerRoute = express.Router();

// Define the registration route
registerRoute.post('/register', async (req, res) => { // Add 'async' here
    try {
        // Extract registration data from the request body
        const { username, password, firstName, lastName, email } = req.body;

        // Perform registration validation using Joi
        const validation = registrationSchema.validate({ username, password, email });

        if (validation.error) {
            // Validation failed, send a 400 (Bad Request) response with an error message
            return res.status(400).json({ error: validation.error.details[0].message });
        }

        // Call the registerUser function to save the user to the database
        const result = await registerUser(username, password, firstName, lastName, email);

        if (result === null) {
            // User already exists, send a 400 (Bad Request) response with an error message
            res.status(400).json({ error: 'User already exists' });
        } else {
            // User registered successfully, send a 201 (Created) response with a success message and result
            res.status(201).json({ message: 'User registered successfully', result });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        // Handle unexpected errors with a 500 (Internal Server Error) response
        res.status(500).json({ error: 'Registration failed' });
    }
});

export default registerRoute;
