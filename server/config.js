import dotenv from 'dotenv';
dotenv.config(); // Loads variables from .env into process.env

const config = {
    db: {
        host: process.env.DB_HOST, // Database host
        user: process.env.DB_USER, // Database user
        password: process.env.DB_PASSWORD, // Database password
        database: process.env.DB_DATABASE, // Database name
    },
    portServer: process.env.PORT, // Application server port
    reactPort: process.env.REACT_APP_SERVER_URL, // React server URL
    secretKey: process.env.SECRET_KEY, // Secret key for your application
    smtp: {
        service: process.env.SMTP_SERVICE, // SMTP service for sending emails
        port: process.env.SMTP_PORT, // SMTP port for email transmission
        user: process.env.SMTP_USER, // SMTP username for authentication
        pass: process.env.SMTP_PASS, // SMTP password for authentication
    },
};

export const { portServer, secretKey } = config; // Export application server port and secret key
export default config; // Export the entire configuration object
