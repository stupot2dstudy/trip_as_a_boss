// authenticationMiddleware.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../config.js'; // Import the database configuration

const pool = mysql.createPool(config.db); // Create a MySQL connection pool

// Middleware for authentication
export async function authenticationMiddleware(req, res, next) {
    try {
        const { username, email } = req.body; // Get the username and email from the request body

        // Check if the user is authenticated based on username and email
        const connection = await pool.getConnection(); // Get a connection from the connection pool
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND email = ?', [username, email]); // Execute a SQL query to find matching users
        connection.release(); // Release the connection back to the pool

        if (rows.length > 0) {
            // User is authenticated, allow access to the next middleware or route
            next();
        } else {
            // User is not authenticated, send an unauthorized response
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        // Handle any errors that occur during authentication
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};

