// tokenMiddleware.js
import jwt from 'jsonwebtoken';
import { secretKey } from '../../config.js';

// Middleware to create a token
export function createToken(req, res, next) {
    const { username } = req.body; // Assuming you have a 'username' field in your login request

    // Create a JWT token with the user's username
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
}

// Middleware to verify a token
export function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
    });
}
