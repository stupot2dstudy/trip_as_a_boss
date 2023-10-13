// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Login.css';
import serverURL from '../../Config/apiConfig';

const Login = () => {
    // State for username, password, and error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Hook to handle navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the login endpoint
            const response = await fetch(`${serverURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200) {
                // Handle successful login here
                const data = await response.json();
                // You can store the user token or information in a global context or local storage for subsequent requests
                // Example: storeTokenOrUserData(data.token);
                console.log('Logged in successfully');
                console.log('Username:', username);

                // Redirect to the user's profile or dashboard page
                navigate(`/${username}/dashboard`);
            } else {
                if (response.status === 401) {
                    setError('Login failed. Check your username and password.');
                } else {
                    setError('Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Error during login: ' + error.message);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
