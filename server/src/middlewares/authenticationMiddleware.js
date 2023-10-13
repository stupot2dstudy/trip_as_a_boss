// authenticationMiddleware.js

import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for creating and verifying JWTs
import { secretKey } from '../../config.js'; // Import the secret key from your configuration

// Function to encrypt a password
export async function encryptPassword(password) {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Password encryption failed:', error);
        throw new Error('Password encryption failed');
    }
}

// Function to compare passwords
export async function comparePasswords(providedPassword, storedPassword) {
    try {
        const isMatch = await bcrypt.compare(providedPassword, storedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}

// Middleware for authentication
export function authenticationMiddleware(req, res, next) {
    const token = req.query.token; // Extract the token from the request query parameters

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify the token using the secret key

        req.user = decoded; // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' }); // Respond with an Unauthorized status if token verification fails
    }
}
