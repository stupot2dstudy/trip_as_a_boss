// client/src/api.js

const BASE_URL = process.env.REACT_APP_SERVER_URL; // Define your server URL in a .env file

export const fetchUserData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/user-data`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

