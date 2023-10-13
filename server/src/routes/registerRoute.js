// registerRoute.js

// Import required modules and functions
import express from 'express';
import { registerUser } from '../db/queries/userRegistration.js'; // Import the registerUser function
import { registrationSchema } from '../db/queries/validation.js'; // Import the Joi schema
import { encryptPassword } from '../middlewares/authenticationMiddleware.js';

const registerRoute = express.Router();

// Define the registration route
registerRoute.post('/register', async (req, res) => {
    try {
        const { username, password, firstName, lastName, email } = req.body;

        // Add validation if needed
        // Example: const validation = registrationSchema.validate({ username, password, email });
        // if (validation.error) {
        //     return res.status(400).json({ error: validation.error.details[0].message });
        // }

        // Call the registerUser function to save the user to the database
        const result = await registerUser(username, password, firstName, lastName, email);

        if (result === null) {
            return res.status(400).json({ error: 'User already exists' });
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

export default registerRoute;
