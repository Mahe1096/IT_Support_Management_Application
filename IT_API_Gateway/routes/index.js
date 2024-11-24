const express = require('express');
const axios = require('axios');  // To interact with Consul API
const router = express.Router();

// Consul endpoint for fetching services
const CONSUL_URL = 'http://host.docker.internal:8500/v1/catalog/services';

// Function to fetch services from Consul
const fetchServicesFromConsul = async () => {
  try {
    // Fetch all services registered in Consul
    const response = await axios.get(CONSUL_URL);
    const services = response.data;

    // Dynamically load service routes based on the services registered in Consul
    const serviceMappings = {
      'user-management-service': 'authServiceController',
      'ticket-management-service': 'ticketServiceController',
      'notification-service': 'notificationServiceController',
      'knowledge-base-service': 'articleServiceController',
    };

    // Register the routes for available services
    for (const serviceName in services) {
      if (services.hasOwnProperty(serviceName)) {
        const controllerName = serviceMappings[serviceName];
        
        if (controllerName) {
          try {
            const controller = require(`../controllers/${controllerName}`);
            router.use(`/${serviceName}`, controller);
            console.log(`Routes for ${serviceName} have been registered.`);
          } catch (err) {
            console.error(`Error loading controller for ${serviceName}:`, err.message);
          }
        } else {
          console.log(`No controller mapping found for service: ${serviceName}`);
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
}).catch(err => {
  console.error('Error initializing routes:', err.message);
});

module.exports = router;
