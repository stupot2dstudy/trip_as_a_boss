// RegistrationSuccessfully.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to handle routing
import '../../css/RegistrationSuccessfully.css'; // Import the CSS file for styling

const RegistrationSuccessfully = () => {
    return (
        <div className="registration-success">
            <div className="registration-success-container">
                <h2 className="registration-success-header">Registration Successful</h2>
                <p className="registration-success-message">Your registration was successful. You can now log in.</p>
                <Link to="/login" className="login-link">Login</Link> {/* Create a link to the login page */}
            </div>
        </div>
    );
};

export default RegistrationSuccessfully;
