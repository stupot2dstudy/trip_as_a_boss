// recommendations.js

import express from 'express';
import mysql from 'mysql2/promise';
import config from '../../config.js';
import { generateUniqueID } from '../../controllers/generateUniqueID.js';
import { handleMissingValueError } from '../../controllers/errorController.js';

const pool = mysql.createPool(config.db);
const recommendations = [];

export const createRecommendation = async (req, res) => {
    try {
        const { title, creatorName, commentaries } = req.body;

        // Check for missing values
        if (!title || !creatorName) {
            return handleMissingValueError(res, 'title or creatorName');
        }

        const newRecommendation = {
            id: generateUniqueID(),
            title: title, // Use the destructured variables directly
            likes: 0,
            creator: {
                name: creatorName, // Use the destructured variable directly
                avatar: null,
            },
            commentaries: commentaries || null // Ensure 'commentaries' is defined as null for SQL
        };

        const connection = await pool.getConnection();
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

        connection.release();

        recommendations.push(newRecommendation);

        res.status(201).json({ message: 'Recommendation created successfully', recommendation: newRecommendation });
    } catch (error) {
        console.error('Error creating recommendation:', error);
        res.status(500).json({ error: 'Failed to create recommendation' });
    }
};

export const getRecommendations = async (req, res) => {
    try {
        const { title, likes, creator_id } = req.query;

        let sql = 'SELECT * FROM recommendations WHERE 1';

        const params = [];

        if (title) {
            sql += ` AND title = ?`;
            params.push(title);
        }

        if (likes) {
            sql += ` AND likes = ?`;
            params.push(parseInt(likes, 10));
        }

        if (creator_id) {
            sql += ` AND creator_id = ?`;
            params.push(parseInt(creator_id, 10));
        }

        const [results] = await pool.execute(sql, params);

        res.json(results);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
