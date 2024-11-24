const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rabbitmqProducer = require('./services/rabbitmqProducer');
const registerService = require('../Service_Discovery/registerService'); // Ensure this matches the function name

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Register the service with Consul
const registerWithConsul = async () => {
  try {
    const serviceName = 'ticket-management-service';
    const servicePort = process.env.PORT || 5002;
    await registerService(serviceName, servicePort); // Register the service with Consul
  } catch (error) {
    console.error('Error registering service with Consul:', error.message);
    process.exit(1);  // Exit if the registration fails, to avoid running the server without registration
  }
};

const app = express();

// Middleware
app.use(bodyParser.json());

// Health check route for Consul to monitor
app.get('/health', (req, res) => {
  res.status(200).send('Service is healthy');
});

// Routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// RabbitMQ connection
(async () => {
  try {
    await rabbitmqProducer.connect(); // Connect to RabbitMQ at server start
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    process.exit(1);  // Exit if RabbitMQ connection fails
  }
})();

// Register with Consul before starting the server
registerWithConsul().then(() => {
  // Start the server only after service registration is successful
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`Ticket Management Service running on port ${PORT}`);
  });
});
