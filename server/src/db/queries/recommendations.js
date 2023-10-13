// recommendations.js

import mysql from 'mysql2/promise'; // Import the MySQL library
import config from '../../../config.js'; // Import your configuration
import { generateUniqueID } from '../../controllers/generateUniqueID.js'; // Import a function to generate unique IDs
import { handleMissingValueError } from '../../controllers/errorController.js'; // Import an error handling function

const pool = mysql.createPool(config.db); // Create a MySQL connection pool
const recommendations = []; // Define and initialize the recommendations array

// Function to create a new recommendation
export const createRecommendation = async (req, res) => {
    try {
        const { title, creatorName, commentaries, view_image } = req.body; // Destructure values from the request body

        // Check for missing values (title, creatorName, and view_image)
        if (!title || !creatorName || !view_image) {
            return handleMissingValueError(res, 'title, creatorName, or view_image');
        }

        // Create a new recommendation object
        const newRecommendation = {
            id: generateUniqueID(), // Generate a unique ID
            title,
            view_image,
            likes: 0,
            creator: {
                name: creatorName,
                avatar: null,
            },
            commentaries: commentaries || null,
        };

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Insert the new recommendation into the database
        const [result] = await connection.execute(
            'INSERT INTO recommendations (id, title, view_image, likes, creator_id, creator_avatar, commentaries) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                newRecommendation.id,
                newRecommendation.title,
                newRecommendation.view_image,
                newRecommendation.likes,
                newRecommendation.creator.name,
                newRecommendation.creator.avatar,
                newRecommendation.commentaries
            ]
        );

        connection.release(); // Release the database connection

        // Assuming you have a 'recommendations' array to store temporarily
        recommendations.push(newRecommendation);

        res.status(201).json({ message: 'Recommendation created successfully', recommendation: newRecommendation });
    } catch (error) {
        console.error('Error creating recommendation:', error);
        res.status(500).json({ error: 'Failed to create recommendation' });
    }
};

// Function to get recommendations based on query parameters
export const getRecommendations = async (req, res) => {
    try {
        const { title, likes, creator_id } = req.query; // Destructure query parameters

        let sql = 'SELECT * FROM recommendations WHERE 1'; // Base SQL query

        const params = []; // Array to store query parameters dynamically

        if (title) {
            sql += ` AND title = ?`; // Add title filter to SQL
            params.push(title); // Add title to parameters
        }

        if (likes) {
            sql += ` AND likes = ?`; // Add likes filter to SQL
            params.push(parseInt(likes, 10)); // Parse likes as an integer and add to parameters
        }

        if (creator_id) {
            sql += ` AND creator_id = ?`; // Add creator_id filter to SQL
            params.push(parseInt(creator_id, 10)); // Parse creator_id as an integer and add to parameters
        }

        const [results] = await pool.execute(sql, params); // Execute SQL query with dynamic parameters

        res.json(results); // Send the query results as a JSON response
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};

