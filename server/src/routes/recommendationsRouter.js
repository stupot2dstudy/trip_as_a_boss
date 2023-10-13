// recommendationsRouter.js

// Import required modules and functions
import express from 'express'; // Import the Express framework
import { createRecommendation, getRecommendations } from '../db/queries/recommendations.js'; // Import functions for creating and retrieving recommendations
import { upvoteRecommendation, downvoteRecommendation } from '../controllers/voteController.js'; // Import functions for upvoting and downvoting recommendations
import { fileURLToPath } from 'url'; // Import fileURLToPath to get the current filename
import path from 'path'; // Import the path module for working with file paths

const __filename = fileURLToPath(import.meta.url); // Get the current filename
const __dirname = path.dirname(__filename); // Get the directory path of the current file

const router = express.Router(); // Create an Express router instance

// Create a new recommendation (POST request)
router.post('/recommendations', createRecommendation);

// Retrieve recommendations in JSON format (GET request)
router.get('/recommendations/json', getRecommendations);

// Upvote a recommendation (POST request)
router.post('/recommendations/:id/upvote', upvoteRecommendation);

// Downvote a recommendation (POST request)
router.post('/recommendations/:id/downvote', downvoteRecommendation);

// Serve the HTML page when accessing the /recommendations endpoint (GET request)
router.get('/recommendations', (req, res) => {
    const htmlFilePath = path.join(__dirname, '../public/recommendation.html'); // Construct the absolute file path to the HTML page
    res.sendFile(htmlFilePath); // Send the HTML file as a response
});

// Export the router for use in other parts of your application
export default router;
