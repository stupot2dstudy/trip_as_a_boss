// Welcome.js
import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for programmatic navigation
import '../../css/Welcome.css'; // Import the associated CSS stylesheet

const Welcome = () => {
    const navigate = useNavigate(); // Get the navigation function using the useNavigate hook

    // Define a function to handle the "Explore Now" button click
    const handleExploreNowClick = () => {
        // Use the navigate function to navigate to the "/explore" route
        navigate('/explore'); // Replace '/explore' with your desired route
    };

    return (
        <div className="welcome">
            <h1 className="welcome-title">Welcome to My Website</h1>
            <p className="welcome-text">Discover amazing places and share your experiences with others.</p>
            <button className="welcome-button" onClick={handleExploreNowClick}>Explore Now</button>
        </div>
    );
};

export default Welcome; // Export the Welcome component as the default export
