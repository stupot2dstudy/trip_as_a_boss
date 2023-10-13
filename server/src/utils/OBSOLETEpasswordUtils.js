// passwordUtils.js

import bcrypt from 'bcrypt';

// Function to encrypt a password
export async function encryptPassword(password) {
    const saltRounds = 10; // The number of salt rounds determines the strength of the encryption

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Password encryption failed:', error);
        throw new Error('Password encryption failed');
    }
}


export async function comparePasswords(providedPassword, storedPassword) {
    try {
        // Use bcrypt to compare the passwords
        const isMatch = await bcrypt.compare(providedPassword, storedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}
