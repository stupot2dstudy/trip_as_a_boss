import React from 'react';
import { useParams } from 'react-router-dom';
import useUser from './useUser'; // Custom hook for fetching user data
import serverURL from '../../Config/apiConfig'; // Server API configuration
import '../../css/Dashboard.css'; // Import your CSS file for styling

function Dashboard({ token }) {
    const { username } = useParams(); // Get the username from route parameters

    // Fetch user data using the custom hook
    const user = useUser(username);

    // State to toggle edit mode for user information
    const [isEditMode, setIsEditMode] = React.useState(false);

    // User data state for form editing
    const [updatedUser, setUpdatedUser] = React.useState({});

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${serverURL}/${user.id}/id`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Handle success, e.g., display a success message
                console.log('User information updated successfully');
                setIsEditMode(false); // Turn off edit mode after success
            } else {
                // Handle errors, e.g., display an error message
                console.error('Error updating user information');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    return (
        <div className="dashboard-container"> {/* Add a class name for styling */}
            <div className="dashboard-content">
                {isEditMode ? (
                    <div>
                        <h1>Edit Your Profile</h1>
                        <label>first_name:</label>
                        <input
                            type="text"
                            value={updatedUser.first_name || ''}
                            onChange={(e) =>
                                setUpdatedUser({ ...updatedUser, first_name: e.target.value })
                            }
                        />
                        <label>last_name:</label>
                        <input
                            type="text"
                            value={updatedUser.last_name || ''}
                            onChange={(e) =>
                                setUpdatedUser({ ...updatedUser, last_name: e.target.value })
                            }
                        />
                        <label>password:</label>
                        <input
                            type="text"
                            value={updatedUser.password || ''}
                            onChange={(e) =>
                                setUpdatedUser({ ...updatedUser, password: e.target.value })
                            }
                        />
                        <form onSubmit={handleFormSubmit}>
                            <label>email:</label>
                            <input
                                type="text"
                                value={updatedUser.email || ''}
                                onChange={(e) =>
                                    setUpdatedUser({ ...updatedUser, email: e.target.value })
                                }
                            />
                            {/* Add additional fields for other user data to edit */}
                            <button type="submit">Update User</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Welcome, {username}!</h1>
                        {user ? (
                            <div>
                                <p>First Name: {user.first_name}</p>
                                <p>Last Name: {user.last_name}</p>
                                <p>Password: {user.password}</p>
                                <p>Email: {user.email}</p>
                                <p>Token: {token}</p> {/* Display the token here */}
                            </div>
                        ) : (
                            <p className="loading-message">Loading user data...</p>
                        )}
                        <button onClick={() => setIsEditMode(true)}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
