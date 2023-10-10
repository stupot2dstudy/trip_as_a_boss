// userRegistration.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../../config.js'; // Import your configuration

const pool = mysql.createPool(config.db); // Create a MySQL connection pool

// Function to register a new user
export const registerUser = async (username, password, firstName, lastName, email) => {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool

        // Check if the user already exists based on username or email
        const [existingUsers] = await connection.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            connection.release(); // Release the database connection
            return null; // User already exists, return null to indicate failure
        }

        // SQL query to insert a new user into the database
        const sql =
            'INSERT INTO users (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [username, password, firstName, lastName, email]);

        connection.release(); // Release the database connection

        console.log('User registered successfully'); // Log success message
        return result; // Return the result of the database insert operation
    } catch (err) {
        console.error(`Error registering user: ${err.message}`); // Log error message
        throw err; // Throw an error if there's a problem
    }
};
