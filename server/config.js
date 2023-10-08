// config.js

import dotenv from 'dotenv';

dotenv.config(); // Loads variables from .env into process.env

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    port: process.env.PORT,
    secret: process.env.SECRET_KEY, // Add this line to export secretKey
};

export default config;