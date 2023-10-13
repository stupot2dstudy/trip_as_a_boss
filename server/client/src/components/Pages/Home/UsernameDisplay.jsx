// UsernameDisplay.jsx
import { useParams } from 'react-router-dom'; // Import the useParams hook from react-router-dom

function UsernameDisplay() {
    const { username } = useParams(); // Retrieve the "username" parameter from the route

    return (
        <div>
            <h1>Welcome, {username}!</h1> {/* Display a welcome message with the username from the route */}
        </div>
    );
}

export default UsernameDisplay; // Export the UsernameDisplay component as the default export
