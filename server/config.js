// config.js

import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    port: process.env.PORT,
};

export default config;
