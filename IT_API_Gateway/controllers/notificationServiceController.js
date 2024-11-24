const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://host.docker.internal:5004/api/notifications';

// Helper function to handle Axios requests
const makeRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data || err.message || 'Unknown error';
    throw { status, message };
  }
};

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { status, data } = await makeRequest('POST', `${BASE_URL}`, req.body, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

module.exports = router;
