// userLogin.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../../config.js'; // Import your configuration

const pool = mysql.createPool(config.db); // Create a MySQL connection pool

// Function to log in a user
export async function loginUser(username, password) {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool

        // Check if the user with the provided username and password exists
        const [users] = await connection.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );

        if (users.length === 0) {
            connection.release(); // Release the database connection
            return null; // User not found or incorrect password
        }

        // If the user exists and the password is correct, return the user data
        const user = users[0];
        connection.release(); // Release the database connection
        return user;
    } catch (err) {
        console.error(`Error logging in user: ${err.message}`);
        throw err; // Throw an error if there's a problem
    }
}

// Function to get a user by their ID
export async function getUserById(userId) {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool

        // Retrieve the user by their ID
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
