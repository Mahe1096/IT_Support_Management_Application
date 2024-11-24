const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const registerService = require('../Service_Discovery/registerService'); // Path to your registerService.js

dotenv.config();
console.log(`Mongo URI: ${process.env.MONGO_URI}`);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/health', async (req, res) => {
  try {
    // You can add more complex health check logic here (e.g., DB, external services)
    res.status(200).json({ status: 'Healthy' });
  } catch (error) {
    res.status(500).json({ status: 'DOWN', error: error.message });
  }
});

// Register User Management Service with Consul
const registerWithConsul = async () => {
  try {
    const serviceName = 'user-management-service';
    const servicePort = process.env.PORT || 5001;
    await registerService(serviceName, servicePort);
  } catch (error) {
    console.error('Error registering service with Consul:', error.message);
    process.exit(1);  // Exit if the registration fails, to avoid running the server without registration
  }
};

// Register with Consul before starting the server
registerWithConsul().then(() => {
  app.use('/api/auth', require('./routes/authRoutes'));

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`User Management Service running on port ${PORT}`));
});
