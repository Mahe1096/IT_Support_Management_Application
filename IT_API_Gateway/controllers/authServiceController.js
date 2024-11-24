const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://host.docker.internal:5001/api/auth';

// Helper function to handle Axios requests
const makeRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data || err.message || 'Unknown error';
    throw { status, message };
  }
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { status, data } = await makeRequest('POST', `${BASE_URL}/register`, req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { status, data } = await makeRequest('POST', `${BASE_URL}/login`, req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Logout a user
router.post('/logout', async (req, res) => {
  try {
    const { status, data } = await makeRequest('POST', `${BASE_URL}/logout`, req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Reset password (protected route)
router.post('/reset-password', async (req, res) => {
  try {
    const { status, data } = await makeRequest('POST', `${BASE_URL}/reset-password`, req.body, {
      Authorization: req.headers.authorization
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Get user details by ID (protected route)
router.get('/user/:id', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/user/${req.params.id}`, {}, {
      Authorization: req.headers.authorization
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Get all users (protected route)
router.get('/users', async (req, res) => {
  try {
    const { status, data } = await makeRequest('GET', `${BASE_URL}/users`, {}, {
      Authorization: req.headers.authorization
    });
    res.status(status).send(data);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

module.exports = router;
