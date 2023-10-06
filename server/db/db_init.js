import mysql from 'mysql2/promise';
import config from '../config.js'; // Import the database configuration


// Function to initialize the database schema
export async function initializeDatabase() {
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(config.db);

        // SQL query to create the user table
        const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255)
      )
    `;

        // Execute the query
        await connection.query(createUserTableQuery);

        // Close the database connection
        await connection.end();

        console.log('User table created successfully.');
    } catch (error) {
        console.error('Error creating user table:', error);
        throw error;
    }
}
