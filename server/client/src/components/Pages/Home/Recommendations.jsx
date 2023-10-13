// Recommendations.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import serverURL from '../../Config/apiConfig';

const Recommendations = () => {
    // State to store recommendations
    const [recommendations, setRecommendations] = useState([]);

    // Use the useEffect hook to fetch data when the component mounts
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
            <div className="card-deck"> {/* Use Bootstrap card-deck to group cards */}
                {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="card">
                        <img src={recommendation.view_image} className="card-img-top" alt="Recommendation" />
                        <div className="card-body">
                            <h5 className="card-title">{recommendation.title}</h5>
                            <p className="card-text">{recommendation.commentaries}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Likes: {recommendation.likes}</li>
                            {/* Add more list items as needed */}
                        </ul>
                        <div className="card-body">
                            <Link to="/your-route">Card link</Link> {/* Replace "/your-route" with your desired route */}
                            <Link to="/another-route">Another link</Link> {/* Replace "/another-route" with another route */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
