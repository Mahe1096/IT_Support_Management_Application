const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
require("dotenv").config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set true for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App password goes here
    },
});

// Send email method
const sendEmail = async (to, subject, ticketDetails) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER, // Sender email
            to, // Recipient email
            subject, // Email subject
            text: ticketDetails, // Email body (plain text format)
        });

        logger.info(`Email sent to ${to} with subject: "${subject}"`);
    } catch (err) {
        logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
};

module.exports = { sendEmail };
