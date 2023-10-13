// main.jsx

import React from 'react'; // Import the React library
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App.jsx'; // Import the main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Render the main App component within BrowserRouter */}
    </BrowserRouter>
  </React.StrictMode>
);

