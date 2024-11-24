const axios = require('axios');


const registerService = async (serviceName, servicePort) => {
  const serviceDetails = {
    Name: serviceName,
    Address: 'host.docker.internal', // For Docker Desktop on Windows
    
    Port: Number(servicePort), // Ensure Port is an integer
    Check: {
      HTTP: `http://host.docker.internal:${servicePort}/health`,
      Interval: '10s',
    },
  };

  console.log('Registering service with payload:', JSON.stringify(serviceDetails, null, 2)); // Debugging log

  try {
    const response = await axios.put(
        'http://host.docker.internal:8500/v1/agent/service/register',
      serviceDetails
    );
    console.log(`${serviceName} registered successfully with Consul. Response:`, response.data);
  } catch (error) {
    console.error(`Failed to register ${serviceName}:`, error.response?.data || error.message);
  }
};

module.exports = registerService;
