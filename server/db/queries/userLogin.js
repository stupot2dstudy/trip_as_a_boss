// userLogin.js

import mysql from 'mysql2/promise';
import config from '../../config.js';

const pool = mysql.createPool(config.db);

export async function loginUser(username, password) {
    try {
        const connection = await pool.getConnection();

        // Check if the user with the provided username and password exists
        const [users] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (users.length === 0) {
            connection.release();
            return null; // User not found or incorrect password
        }

        // If the user exists and the password is correct, return the user data
        const user = users[0];
        connection.release();
        return user;
    } catch (err) {
        console.error(`Error logging in user: ${err.message}`);
        throw err;
    }
}

export async function getUserById(userId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
        connection.release();

        if (rows.length === 1) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

