// validation.js

import Joi from 'joi';

// Define the schema for user registration
export const registrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

