const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const registerService = require('../Service_Discovery/registerService'); // Path to your registerService.js

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Healthy' }); 
});

// Register Knowledge Base Service with Consul
const registerWithConsul = async () => {
  try {
    const serviceName = process.env.SERVICE_NAME || 'knowledge-base-service'; 
    const servicePort = process.env.PORT || 5003;  
    await registerService(serviceName, servicePort);
  } catch (error) {
    console.error('Error registering service with Consul:', error.message);
 
    process.exit(1);  n
  }
};


registerWithConsul().then(() => {
  
  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => {
    console.log(`Knowledge Base Service running on port ${PORT}`);
  });
});
