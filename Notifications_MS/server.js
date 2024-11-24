const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const notificationRoutes = require("./routes/notificationRoutes");
const connectMessageBroker = require("./services/messageBroker");
const registerService = require("../Service_Discovery/registerService"); // Path to your registerService.js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/notifications", notificationRoutes);

// Start RabbitMQ listener
connectMessageBroker();

// Register Notification Service with Consul
const registerWithConsul = async () => {
  try {
    const serviceName = "notification-service";
    const servicePort = process.env.PORT || 5004;
    await registerService(serviceName, servicePort); // Register with Consul
  } catch (error) {
    console.error("Error registering service with Consul:", error.message);
    process.exit(1); // Exit if the registration fails
  }
};

app.get('/health', (req, res) => {
    
    res.status(200).json({ status: 'Healthy' }); 
  });

// Register with Consul before starting the server
registerWithConsul().then(() => {
  // Start the server only after service registration is successful
  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });
});
