// App.jsx
import React, { useState } from 'react'; // Import React and useState from React
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import routing components from react-router-dom
import Welcome from './components/Pages/Home/Welcome'; // Import the Welcome component
import Login from './components/Pages/Home/Login'; // Import the Login component
import RegisterUser from './components/Pages/Home/RegisterUser'; // Import the RegisterUser component
import Navbar from './components/Utls/Navbar'; // Import the Navbar component
import RegistrationSuccessfully from './components/Pages/Home/RegistrationSuccessfully'; // Import the RegistrationSuccessfully component
import NotFound404 from './components/Utls/NotFound404'; // Import the NotFound404 component
import Dashboard from './components/Pages/Home/Dashboard'; // Import the Dashboard component
import MainIndex from './components/Pages/Home/MainIndex'; // Import the MainIndex component
import Recommendations from './components/Pages/Home/Recommendations'; // Import the Recommendations component

function App() {
  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <Routes> {/* Define routing for the application */}
        <Route path="/" element={<Welcome />} /> {/* Render the Welcome component for the root path */}
        <Route path="/login" element={<Login />} /> {/* Render the Login component for the "/login" path */}
        <Route path="/:username/dashboard" element={<Dashboard />} /> {/* Render the Dashboard component for dynamic username-based paths */}
        <Route path="/register" element={<RegisterUser />} /> {/* Render the RegisterUser component for the "/register" path */}
        <Route path="/registration-success" element={<RegistrationSuccessfully />} /> {/* Render the RegistrationSuccessfully component for the "/registration-success" path */}
        <Route path="/recommendations" element={<Recommendations />} /> {/* Render the Recommendations component for the "/recommendations" path */}
        <Route path="/explore" element={<MainIndex />} /> {/* Render the MainIndex component for the "/explore" path */}
        <Route path='*' element={<NotFound404 />} /> {/* Render the NotFound404 component for all other unmatched paths */}
      </Routes>
    </>
  );
}

export default App; // Export the App component as the default export
