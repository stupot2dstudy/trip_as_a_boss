// getUserRouter.js

// Import necessary modules and functions
import express from 'express';
import { getUserByUsername } from '../db/queries/userGetBy/getUserByUsername.js';
import { getUserById } from '../db/queries/userGetBy/getUserById.js';
import { updateUserInDatabase } from '../db/queries/userGetBy/userUpdateModule.js'

// Create an instance of an Express router
const getUserRouter = express.Router();

// Route to get a user by their ID
getUserRouter.get('/id/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Extract the user ID from the request parameters
        const user = await getUserById(userId); // Call the function to get the user by ID from the database

        if (!user) {
            res.status(404).json({ error: 'User not found' }); // Respond with a 404 status if the user is not found
        } else {
            res.status(200).json(user); // Respond with a 200 status and the user data if found
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ error: 'Error fetching user by username' }); // Handle errors and respond with a 500 status
    }
});

// Route to get a user by their username
getUserRouter.get('/:username/user', async (req, res) => {
    try {
        const username = req.params.username; // Extract the username from the request parameters
        const user = await getUserByUsername(username); // Call the function to get the user by username from the database

        if (!user) {
            res.status(404).json({ error: 'User not found' }); // Respond with a 404 status if the user is not found
        } else {
            res.status(200).json(user); // Respond with a 200 status and the user data if found
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ error: 'Error fetching user by username' }); // Handle errors and respond with a 500 status
    }
});

// Route to update a user by their ID
getUserRouter.put('/:userId/id', async (req, res) => {
    const userId = req.params.userId; // Extract the user ID from the request parameters
    const updatedData = req.body; // Request body should contain the updated user data

    try {
        const result = await updateUserInDatabase(userId, updatedData); // Call the function to update the user in the database
        res.json({ success: true, message: 'User updated successfully', result }); // Respond with a success message and the result
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update user', error: error.message }); // Handle errors and respond with a 500 status
    }
});

// Export the user router for use in other parts of the application
export default getUserRouter;
