// src/TripCard.jsx
import React from 'react';

const TripCard = ({ trip }) => {
    return (
        <div className="card">
            <img src={trip.imageUrl} className="card-img-top" alt={trip.destination} />
            <div className="card-body">
                <h5 className="card-title">{trip.destination}</h5>
                <p className="card-text">{trip.description}</p>
            </div>
        </div>
    );
};

export default TripCard;
