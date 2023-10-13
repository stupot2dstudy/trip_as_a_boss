// src/TripList.jsx
import React from 'react';
import TripCard from './TripCard';
import trips from './trips'; // Import your trip data

const TripList = () => {
    return (
        <div className="container">
            <div className="row">
                {trips.map((trip) => (
                    <div className="col-md-4" key={trip.id}>
                        <TripCard trip={trip} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripList;
