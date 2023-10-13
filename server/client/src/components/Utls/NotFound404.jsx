// src/components/NotFound404.jsx

import React from 'react';
import '../css/NotFound404.css';

const NotFound404 = () => {
    return (
        <div className="not-found-container">
            <div className="message-container">
                <h1 className="not-found-header">404 - Not Found</h1>
                <p className="not-found-message">The page you are looking for does not exist.</p>
                <p className="home-link">Go back to the homepage</p>
            </div>
        </div>
    );
};

export default NotFound404;

