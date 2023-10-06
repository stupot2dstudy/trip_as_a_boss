// authenticationMiddleware.js
import mysql from 'mysql2/promise';
import config from '../config.js';

const pool = mysql.createPool(config.db);

export const authenticationMiddleware = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        // Check if the user is authenticated based on username and email
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND email = ?', [username, email]);
        connection.release();

        if (rows.length > 0) {
            // User is authenticated, allow access to the next middleware or route
            next();
        } else {
            // User is not authenticated, send an unauthorized response
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};
