// notFoundMiddleware.js

export const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ message: 'Not Found - 404' });
};
