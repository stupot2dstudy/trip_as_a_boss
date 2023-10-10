// db_init.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../config.js'; // Import the database configuration
import fs from 'fs'; // Import the file system module

// Function to create the ./public/fileUpload folder
function createFileUploadFolder() {
  const folderPath = './public/fileUpload';

  // Check if the folder exists, and if not, create it
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log('Created ./public/fileUpload folder.');
  } else {
    console.log('./public/fileUpload folder already exists.');
  }
}

// Function to initialize the database schema
export async function initializeDatabase() {
  try {
    // Create a connection to the database using the configuration from 'config.js'
    const connection = await mysql.createConnection(config.db);

    // SQL query to create the 'users' table
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

    // SQL query to create the 'recommendations' table
    const createRecommendationsTableQuery = `
            CREATE TABLE IF NOT EXISTS recommendations (
                id VARCHAR(20) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                likes INT,
                creator_id INT,
                creator_avatar VARCHAR(255),
                commentaries VARCHAR(255) DEFAULT 'No commentaries',
                FOREIGN KEY (creator_id) REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;

    // Execute the query to create the 'users' table
    await connection.query(createUserTableQuery);

    // Execute the query to create the 'recommendations' table
    await connection.query(createRecommendationsTableQuery);

    // Create the ./public/fileUpload folder
    createFileUploadFolder();

    // Close the database connection
    await connection.end();

    console.log('User and Recommendations tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}
