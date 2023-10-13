// validation.js

import Joi from 'joi'; // Import the Joi library for schema validation

// Define the schema for user registration
export const registrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(), // Define a string field 'username' with minimum and maximum length constraints and make it required
    email: Joi.string().email().required(), // Define a string field 'email' as a valid email address and make it required
    password: Joi.string().min(6).required(), // Define a string field 'password' with a minimum length constraint and make it required
});

