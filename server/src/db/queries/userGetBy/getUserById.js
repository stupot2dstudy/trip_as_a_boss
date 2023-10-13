// getUserById.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../../../../config.js'; // Import your configuration

const pool = mysql.createPool(config.db); // Create a MySQL connection pool

// Define a function to retrieve a user by their ID
export async function getUserById(userId) {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool

        // Retrieve the user by their ID using a prepared statement
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);

        connection.release(); // Release the database connection

        if (rows.length === 1) {
            return rows[0]; // Return the user data if found
        } else {
            return null; // User not found
        }
    } catch (error) {
        throw error; // Throw an error if there's a problem
    }
}
