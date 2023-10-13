// RegisterUser.jsx
import React, { useState } from 'react'; // Import React and the useState hook
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for programmatic navigation
import '../../css/RegisterUser.css'; // Import the associated CSS stylesheet
import serverURL from '../../Config/apiConfig'; // Import the server URL from an external configuration

const RegisterUser = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [formData, setFormData] = useState({ // Initialize the form data using the useState hook
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [errorMessage, setErrorMessage] = useState(null); // Initialize the error message state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch(`${serverURL}/register`, {
                method: 'POST', // HTTP POST request
                headers: {
                    'Content-Type': 'application/json', // Set the request header for JSON data
                },
                body: JSON.stringify(formData), // Convert form data to JSON and send it in the request body
            });

            if (response.status === 201) {
                // Registration was successful
                console.log('User registered successfully');
                navigate('/registration-success'); // Redirect to the registration success page
            } else {
                // Registration failed, handle errors (e.g., show an error message).
                if (response.status === 400) {
                    const data = await response.json(); // Assuming your server sends an error message in the response
                    setErrorMessage(data.error); // Set the error message from the server response
                } else {
                    setErrorMessage('Registration failed. Please try again.'); // Set a generic error message
                }
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Registration failed. Please try again.'); // Set a generic error message
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="register-user">
            <div className="register-user-container">
                <h2>Register</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if there's an error */}
                <form onSubmit={handleSubmit}>
                    <div className="formgroup">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formgroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formgroup">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formgroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div >
        </div >
    );
};

export default RegisterUser; // Export the RegisterUser component as the default export
