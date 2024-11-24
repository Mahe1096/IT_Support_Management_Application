const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://host.docker.internal:5002/api/tickets';

// Helper function to handle Axios requests
const makeRequest = async (method, url, data = {}, headers = {}, params = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      params,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data || err.message || 'Unknown error';
    throw { status, message };
  }
};

// Create a new ticket
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

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}`, {}, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Search tickets by query
router.get('/search', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/search`, {}, {
      Authorization: req.headers.authorization,
    }, req.query);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Get paginated tickets
router.get('/paginate', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/paginate`, {}, {
      Authorization: req.headers.authorization,
    }, req.query);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Filter tickets by status
router.get('/filter', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/filter`, {}, {
      Authorization: req.headers.authorization,
    }, req.query);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Count all tickets
router.get('/count', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/count`, {}, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Get a ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/${req.params.id}`, {}, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Update a ticket by ID
router.put('/:id', async (req, res) => {
  try {
    const { status, data } = await makeRequest('PUT', `${BASE_URL}/${req.params.id}`, req.body, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Delete a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const { status, data } = await makeRequest('DELETE', `${BASE_URL}/${req.params.id}`, {}, {
      Authorization: req.headers.authorization,
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

module.exports = router;
