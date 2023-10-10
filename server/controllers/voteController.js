// controllers/voteController.js
import mysql from 'mysql2/promise'; // Import MySQL library
import config from '../config.js'; // Import your configuration

// Function to handle upvoting a recommendation
export const upvoteRecommendation = async (req, res) => {
    const recommendationId = req.params.id; // Get the recommendation ID from the route parameter

    try {
        // Create a database connection
        const connection = await mysql.createConnection(config.db);

        // Retrieve the recommendation by ID
        const [results] = await connection.execute(
            'SELECT * FROM recommendations WHERE id = ?',
            [recommendationId]
        );

        if (results.length === 0) {
            connection.end();
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        // Increment the vote count for the recommendation
        const updatedVoteCount = results[0].likes + 1;

        // Update the recommendation with the new vote count
        await connection.execute(
            'UPDATE recommendations SET likes = ? WHERE id = ?',
            [updatedVoteCount, recommendationId]
        );

        connection.end();

        // Send a response indicating a successful upvote
        res.json({ message: 'Recommendation upvoted successfully' });
    } catch (error) {
        console.error('Error upvoting recommendation:', error);
        res.status(500).json({ error: 'Failed to upvote recommendation' });
    }
};

// Function to handle downvoting a recommendation
export const downvoteRecommendation = async (req, res) => {
    const recommendationId = req.params.id; // Get the recommendation ID from the route parameter

    try {
        // Create a database connection
        const connection = await mysql.createConnection(config.db);

        // Retrieve the recommendation by ID
        const [results] = await connection.execute(
            'SELECT * FROM recommendations WHERE id = ?',
            [recommendationId]
        );

        if (results.length === 0) {
            connection.end();
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        // Decrement the vote count for the recommendation
        const updatedVoteCount = results[0].likes - 1;

        // Update the recommendation with the new vote count
        await connection.execute(
            'UPDATE recommendations SET likes = ? WHERE id = ?',
            [updatedVoteCount, recommendationId]
        );

        connection.end();

        // Send a response indicating a successful downvote
        res.json({ message: 'Recommendation downvoted successfully' });
    } catch (error) {
        console.error('Error downvoting recommendation:', error);
        res.status(500).json({ error: 'Failed to downvote recommendation' });
    }
};
