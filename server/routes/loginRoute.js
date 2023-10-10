// loginRoute.js

import express from 'express'; // Import the Express framework
import { loginUser, getUserById } from '../db/queries/userLogin.js'; // Import the loginUser and getUserById functions
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for handling JWTs
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'; // Import the authenticationMiddleware

const loginRoute = express.Router(); // Create an Express router instance for login routes

// Define a route to get a user by ID
loginRoute.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUserById(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Define the login route
loginRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginUser(username, password);

        if (user === null) {
            res.status(401).json({ error: 'Login failed. Check your username and password.' });
        } else {
            // Generate a JSON Web Token (JWT) for the authenticated user
            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, {
                expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
            });

            // Redirect the user to the success page with a token as a query parameter
            res.redirect(`/success.html?token=${token}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Define a protected route that requires user authentication using the authenticationMiddleware
loginRoute.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' });
});

export default loginRoute; // Export the loginRoute for use in other parts of your application
