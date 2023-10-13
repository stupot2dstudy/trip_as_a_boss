// useUser.js
import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useParams } from 'react-router-dom'; // Import the useParams hook for accessing route parameters
import serverURL from '../../Config/apiConfig'; // Import the server URL from an external configuration

function useUser() {
    const { username } = useParams(); // Retrieve the "username" parameter from the route
    const [user, setUser] = useState(null); // Initialize user state to null

    useEffect(() => {
        // Use the useEffect hook to perform a side effect when "username" changes
        fetch(`${serverURL}/${username}/user`)
            .then((response) => {
                if (response.ok) {
                    return response.json(); // If the response is okay, parse it as JSON
                } else {
                    throw new Error('Failed to fetch user data'); // Handle errors with a custom error message
                }
            })
            .then((data) => {
                setUser(data); // Update the user state with fetched user data
            })
            .catch((error) => {
                console.error('Error fetching user data:', error); // Log any errors that occur during the fetch
            });
    }, [username]); // Specify "username" as the dependency for this effect

    return user; // Return the "user" state, which may be null or the user data
}

export default useUser; // Export the useUser function as the default export
