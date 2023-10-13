// generateUniqueID.js

// Function to generate a unique ID
export function generateUniqueID(length = 8) {
    // Define a string of characters from which the ID will be generated
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Initialize an empty string to store the generated ID
    let uniqueID = '';

    // Loop 'length' times to create the ID
    for (let i = 0; i < length; i++) {
        // Generate a random index within the range of characters
        const randomIndex = Math.floor(Math.random() * characters.length);

        // Append the character at the random index to the uniqueID string
        uniqueID += characters.charAt(randomIndex);
    }

    // Return the generated unique ID
    return uniqueID;
}
