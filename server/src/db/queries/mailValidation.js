// mailValidation.js

import nodemailer from 'nodemailer'; // Import the Nodemailer library
import config from '../../../config.js'; // Import your configuration

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE, // Set the email service (e.g., Gmail, Outlook, etc.)
    auth: {
        user: process.env.SMTP_USER, // Set the email address to send emails from
        pass: process.env.SMTP_PASS, // Set the email account password
    },
});

// Function to send a verification email
export const sendVerificationEmail = async (email, verificationLink) => {
    try {
        // Define the email content
        const mailOptions = {
            from: `${process.env.SMTP_SERVICE}`, // Set the "from" email address (same as the service)
            to: email, // Set the recipient's email address
            subject: 'Email Verification', // Set the email subject
            html: `
                <p>Click the link below to verify your email:</p>
                <a href="${verificationLink}">Verify Email</a>
            `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions); // Use the transporter to send the email

        console.log('Verification email sent:', info.response); // Log the result of the email send operation
        return true; // Return true to indicate that the email was sent successfully
    } catch (error) {
        console.error('Error sending verification email:', error); // Log any errors that occur during the email send operation
        return false; // Return false to indicate that there was an error sending the email
    }
};

export default sendVerificationEmail; // Export the sendVerificationEmail function
