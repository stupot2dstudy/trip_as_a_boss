// errorController.js

export const handleMissingValueError = (res, missingField) => {
    res.status(400).json({ error: `Missing value for ${missingField}` });
};
