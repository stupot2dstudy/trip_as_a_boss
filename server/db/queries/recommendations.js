// recommendations.js

import mysql from 'mysql2/promise';
import config from '../../config.js';
import { generateUniqueID } from '../../controllers/generateUniqueID.js';
import { handleMissingValueError } from '../../controllers/errorController.js';

const pool = mysql.createPool(config.db); // Create a MySQL connection pool
const recommendations = []; // An array to store recommendations temporarily

// Function to create a new recommendation
export const createRecommendation = async (req, res) => {
    try {
        const { title, creatorName, commentaries } = req.body; // Destructure values from the request body

        // Check for missing values (title or creatorName)
        if (!title || !creatorName) {
            return handleMissingValueError(res, 'title or creatorName');
        }

        // Create a new recommendation object
        const newRecommendation = {
            id: generateUniqueID(), // Generate a unique ID
            title, // Use the destructured variables directly
            likes: 0,
            creator: {
                name: creatorName, // Use the destructured variable directly
                avatar: null,
            },
            commentaries: commentaries || null, // Ensure 'commentaries' is defined as null for SQL
        };

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Insert the new recommendation into the database
        const [result] = await connection.execute(
            'INSERT INTO recommendations (id, title, likes, creator_id, creator_avatar, commentaries) VALUES (?, ?, ?, ?, ?, ?)',
            [
                newRecommendation.id,
                newRecommendation.title,
                newRecommendation.likes,
                newRecommendation.creator.name,
                newRecommendation.creator.avatar,
                newRecommendation.commentaries
            ]
        );

        connection.release(); // Release the database connection

        recommendations.push(newRecommendation); // Add the new recommendation to the array

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

        res.json(results); // Send the query results as JSON response
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
