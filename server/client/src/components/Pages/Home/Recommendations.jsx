import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import serverURL from '../../Config/apiConfig';

const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch(`${serverURL}/recommendations/json`)
            .then((response) => response.json())
            .then((data) => {
                data.reverse();
                setRecommendations(data);
            })
            .catch((error) => console.error('Error fetching recommendations:', error));
    }, []);

    const handleUpvote = (recommendation) => {
        fetch(`${serverURL}/recommendations/${recommendation.id}/upvote`, {
            method: 'POST',
            // You can include headers and a request body if required by your server
        })
            .then((response) => {
                // Handle the response from the server
                if (response.status === 200) {
                    // The upvote was successful, you may want to update the UI
                } else {
                    // Handle the case where the upvote was not successful
                }
            })
            .catch((error) => {
                console.error('Error upvoting recommendation:', error);
            });
    };

    const handleDownvote = (recommendation) => {
        fetch(`${serverURL}/recommendations/${recommendation.id}/downvote`, {
            method: 'POST',
            // You can include headers and a request body if required by your server
        })
            .then((response) => {
                // Handle the response from the server
                if (response.status === 200) {
                    // The downvote was successful, you may want to update the UI
                } else {
                    // Handle the case where the downvote was not successful
                }
            })
            .catch((error) => {
                console.error('Error downvoting recommendation:', error);
            });
    };

    return (
        <div>
            <h2>Recommendations</h2>
            <div className="card-deck">
                {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="card">
                        <img src={recommendation.view_image} className="card-img-top" alt="Recommendation" />
                        <div className="card-body">
                            <h5 className="card-title">{recommendation.title}</h5>
                            <p className="card-text">{recommendation.commentaries}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Likes: {recommendation.likes}</li>
                            <li className="list-group-item">
                                <button onClick={() => handleUpvote(recommendation)} className="btn btn-success">
                                    Upvote
                                </button>
                                <button onClick={() => handleDownvote(recommendation)} className="btn btn-danger">
                                    Downvote
                                </button>
                            </li>
                            <li className="list-group-item">Created at: {formatDate(recommendation.created_at)}</li>
                        </ul>
                        <div className="card-body">
                            <Link to="/your-route">Card link</Link>
                            <Link to="/another-route">Another link</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
