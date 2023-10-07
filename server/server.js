import express from 'express';
import config from './config.js';
import bodyParser from 'body-parser'
import { initializeDatabase } from './db/db_init.js';
import { registerUser } from './db/queries/userRegistration.js'; // Import the registerUser function
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'; // Import the notFoundMiddleware
import { authenticationMiddleware } from './middlewares/authenticationMiddleware.js';
import { loginUser } from './db/queries/userLogin.js'; // Adjust the path as needed
import { registrationSchema } from './db/queries/validation.js'; // Import the Joi schema
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library



// Create an Express application
const app = express();
// Get the current module's directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON requests
app.use(express.json());
// Serve static files from the 'public' directory

app.use(express.static(__dirname + '/client'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

// **Second root test
// app.use(express.static(__dirname + '/public'));
// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/public/register.html');
// });
// // Route for successful login
// app.get('/success', (req, res) => {
//     res.sendFile(__dirname + '/success.html');
// });
// // *Define a simple route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

app.post('/register', async (req, res) => {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        const result = await registerUser(username, password, firstName, lastName, email);

        if (result === null) {
            // User already exists, send a 400 (Bad Request) response with an error message
            res.status(400).json({ error: 'User already exists' });
        } else {
            // User registered successfully, send a 201 (Created) response with a success message and result
            res.status(201).json({ message: 'User registered successfully', result });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        // Handle unexpected errors with a 500 (Internal Server Error) response
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginUser(username, password);

        if (user === null) {
            res.status(401).json({ error: 'Login failed. Check your username and password.' });
        } else {
            // Generate a JSON Web Token (JWT) for the authenticated user
            const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
                expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
            });

            // Return the token along with a success message
            res.status(200).json({ message: 'Login successful', user, token });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
// Define a protected route that requires user authentication
app.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' });
});
// Use the notFoundMiddleware as the last middleware to handle 404 errors
app.use(notFoundMiddleware);

initializeDatabase()

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
