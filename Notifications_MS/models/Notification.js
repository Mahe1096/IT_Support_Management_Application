// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },    // User who will receive the notification
    email: { type: String, required: true },      // User's email address
    message: { type: String, required: true },    // Notification message
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }, // Notification status
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }, // Linked ticket ID
    createdAt: { type: Date, default: Date.now },  // Timestamp of notification creation
});

module.exports = mongoose.model('Notification', NotificationSchema);
