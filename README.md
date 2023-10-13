# Node.js Server and React-Vite App
Final Project for HAB

## trip_like_a_boss
### (`stupot2d`, `trip_as_a_boss`)

### 'Recommended travel agency'
Agencia de viajes recomendados

This repository contains a Node.js server and a React-Vite app. Below, you'll find an introduction to each component and how to set up and run this application.

## Node.js Server

The Node.js server is responsible for providing a backend for your application. It handles routing, database operations, and serves as the API endpoint for your React-Vite app.

Routes
Registration Route: Allows users to register.
Login Route: Handles user login and authentication.
User Routes: Retrieve user data by ID or username and update user data.
Recommendations Route: Create, retrieve, upvote, and downvote recommendations.
File Upload Route: In progress, handles file uploads (resolve error).
Custom 404 Middleware: Handles 404 errors with a custom HTML page.


## React-Vite App

The React-Vite app is the frontend of your application. It provides a user interface for interacting with the Node.js server.

App Configuration (App.jsx)
The App.jsx file defines routing using React Router. It specifies which components to render for different paths within your app.


Components
Welcome: Displays a welcome message on the root path.
Login: Provides a login form.
Dashboard: Shows a user's dashboard using dynamic username-based paths.
RegisterUser: Allows users to register.
RegistrationSuccessfully: Notifies users about successful registration.
Recommendations: Displays recommendations.
MainIndex: Represents the main index or landing page.
NotFound404: Handles and displays custom content for 404 errors.
How to Run the Application
Ensure you have Node.js and npm (Node Package Manager) installed.


