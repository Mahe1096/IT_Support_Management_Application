const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware'); // Import auth middleware
const axios = require('axios');  // To interact with Consul API
const routes = require('./routes');  // Default routes for fallback

dotenv.config();

const app = express();
const PORT = 5000;

// Consul endpoint to fetch registered services
const CONSUL_URL = 'http://host.docker.internal:8500/v1/catalog/services';

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Protected Routes Middleware
// Protect all routes except `/register` and `/login`
app.use((req, res, next) => {
  const openRoutes = ['/api/auth/register', '/api/auth/login'];
  if (openRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next);
});

// Fetch services from Consul and dynamically load routes
const fetchServicesFromConsul = async () => {
  try {
    // Fetch all services registered in Consul
    const response = await axios.get(CONSUL_URL);
    const services = response.data;

    // Dynamically load service routes based on the services registered in Consul
    for (const serviceName in services) {
      if (services.hasOwnProperty(serviceName)) {
        // Define the routes for each service based on registration name
        switch (serviceName) {
          case 'user-management-service':
            const authServiceController = require('./controllers/authServiceController');
            app.use('/api/auth', authServiceController);
            break;
          case 'ticket-management-service':
            const ticketServiceController = require('./controllers/ticketServiceController');
            app.use('/api/tickets', ticketServiceController);
            break;
          case 'notification-service':
            const notificationServiceController = require('./controllers/notificationServiceController');
            app.use('/api/notifications', notificationServiceController);
            break;
          case 'knowledge-base-service':
            const articleServiceController = require('./controllers/articleServiceController');
            app.use('/api/articles', articleServiceController);
            break;
          default:
            console.log(`No controller found for service: ${serviceName}`);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching services from Consul:', error.message);
  }
};

// Initialize services dynamically
fetchServicesFromConsul().then(() => {
  console.log('Routes for available services have been dynamically registered.');
}).catch((err) => {
  console.error('Error during dynamic service registration:', err.message);
});

// Routes (fallback for any other undefined routes)
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
