// tokenRoute.js

import express from 'express';

const authTokenRouter = express.Router();

let authToken = null; // Store the authentication token here

// Define an API endpoint to retrieve the authentication token
authTokenRouter.get('/api/token', (req, res) => {
    if (authToken) {
        res.json({ token: authToken });
    } else {
        res.status(404).json({ error: 'Token not available' });
    }
});

export default authTokenRouter;

