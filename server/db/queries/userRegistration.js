import mysql from 'mysql2/promise';
import config from '../../config.js';

const pool = mysql.createPool(config.db);

export const registerUser = async (username, password, firstName, lastName, email) => {
    try {
        const connection = await pool.getConnection();
        // Check if the user already exists based on username or email
        const [existingUsers] = await connection.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);

        if (existingUsers.length > 0) {
            connection.release();
            return null; // User already exists, return null to indicate failure
        }
        const sql = 'INSERT INTO users (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [username, password, firstName, lastName, email]);
        connection.release();
        console.log('User registered successfully');
        return result;
    } catch (err) {
        console.error(`Error registering user: ${err.message}`);
        throw err;
    }
};
