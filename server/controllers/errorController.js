// errorController.js

// Import required modules and functions

// Define a function to handle a missing value error
export const handleMissingValueError = (res, missingField) => {
    // Set the response status code to 400 (Bad Request) and send a JSON response
    res.status(400).json({ error: `Missing value for ${missingField}` });
};
