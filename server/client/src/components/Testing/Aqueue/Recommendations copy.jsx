// Recommendations.js

import { useState, useEffect } from 'react';
import serverURL from '../../Config/apiConfig';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Fetch recommendations from your server
        fetch(`${serverURL}/recommendations/json`)
            .then((response) => response.json())
            .then((data) => setRecommendations(data))
            .catch((error) => console.error('Error fetching recommendations:', error));
    }, []);

    return (
        <div>
            <h2>Recommendations</h2>
            <ul>
                {recommendations.map((recommendation) => (
                    <li key={recommendation.id}>
                        <h3>{recommendation.title}</h3>
                        <p>{recommendation.commentaries}</p>
                        <p>Likes: {recommendation.likes}</p>
                        {/* Add more fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
