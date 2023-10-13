const extractQueryParameters = (req, res, next) => {
    // Destructure the `username` and `token` query parameters from the request's query object.
    const { username, token } = req.query;

    // Attach the extracted `username` and `token` values to the request object for later use.
    req.username = username;
    req.token = token;

    // Call the `next` function to pass control to the next middleware or route handler.
    next();
};

// Export the `extractQueryParameters` function so it can be used as middleware in an Express.js application.
export default extractQueryParameters;
