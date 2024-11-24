const Notification = require('../models/Notification');
const transporter = require("../services/emailService");

// Function to save notification in the database
const saveNotification = async (req, res) => {
    try {
        // Extract data from the request body
        const { userId, email, message, ticketId } = req.body;

        // Validate the required fields
        if (!userId || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields: userId, email, or message.' });
        }

        // Create a new notification object
        const notification = new Notification({
            userId,
            email,
            message,
            status: 'sent', // Default status when notification is saved
            createdAt: new Date(),
            ticketId, // Optional: Link notification to a ticket if provided
        });

        // Save the notification to the database
        await notification.save();

        console.log('Notification saved successfully.');

        // Send a success response
        res.status(200).json({ message: 'Notification saved successfully.' });
    } catch (error) {
        console.error('Failed to save notification:', error.message);

        // Send an error response
        res.status(500).json({ message: 'Failed to save notification.', error: error.message });
    }
};

module.exports = { saveNotification };
