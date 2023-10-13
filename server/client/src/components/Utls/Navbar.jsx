// Navbar.jsx

import React from 'react'; // Import the React library
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/">Logo</Link> {/* Display the logo and link it to the home page */}
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <Link className="nav-link" to="/login">Sign In</Link> {/* Create a navigation link to the "Sign In" page */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link> {/* Create a navigation link to the home page */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">Link</Link> {/* Create a navigation link to the "Link" page */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link> {/* Create a disabled navigation link */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; // Export the Navbar component as the default export
