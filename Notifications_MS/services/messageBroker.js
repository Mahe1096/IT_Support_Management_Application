const amqp = require("amqplib");
const logger = require("../utils/logger");
const { sendEmail } = require("./emailService");

const connectMessageBroker = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        const channel = await connection.createChannel();
        const queue = "ticket_notifications";

        await channel.assertQueue(queue, { durable: true });
        console.log("Connected to RabbitMQ and listening for messages...");

        channel.consume(queue, async (message) => {
            const content = JSON.parse(message.content.toString());
            logger.info(`Received message: ${JSON.stringify(content)}`);

            try {
                // Extract ticket and user details from payload
                const { email, message: subject, ticket } = content;

                // Format ticket details into a human-readable email body
                const ticketDetails = `
                    Ticket Details:
                    ---------------------
                    Ticket ID: ${ticket._id}
                    Title: ${ticket.title}
                    Description: ${ticket.description}
                    Priority: ${ticket.priority}
                    Status: ${ticket.status}
                    Assigned To: ${ticket.user.name} (${ticket.user.email})
                    Created At: ${new Date(ticket.createdAt).toLocaleString()}
                    Updated At: ${new Date(ticket.updatedAt).toLocaleString()}
                `;

                // Send email notification
                await sendEmail(email, subject, ticketDetails);
                channel.ack(message); // Acknowledge message after successful processing
            } catch (err) {
                logger.error(`Error processing message: ${err.message}`);
            }
        });
    } catch (err) {
        logger.error("Failed to connect to RabbitMQ:", err.message);
    }
};

module.exports = connectMessageBroker;
