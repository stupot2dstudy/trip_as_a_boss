// userUpdateModule.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../../../../config.js'; // Import your configuration

const pool = mysql.createPool(config.db); // Create a MySQL connection pool

// Export an async function to update user values in the users table.
export async function updateUserInDatabase(userId, updatedData) {
    const connection = await pool.getConnection(); // Get a database connection from the pool.

    try {
        // SQL query to update user values.
        const sql = 'UPDATE users SET ? WHERE id = ?';

        const [result] = await connection.query(sql, [updatedData, userId]); // Execute the update query with prepared data.

        return result; // Return the result of the update query.
    } catch (error) {
        throw error; // If an error occurs during the database operation, throw the error.
    } finally {
        connection.release(); // Release the connection back to the pool, whether an error occurred or not.
    }
}
