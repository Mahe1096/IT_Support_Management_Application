const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://host.docker.internal:5003/api/articles';

// Create a new article
router.post('/', (req, res) => {
  axios.post(`${BASE_URL}`, req.body, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Get all articles
router.get('/', (req, res) => {
  axios.get(`${BASE_URL}`, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Search articles by query
router.get('/search', (req, res) => {
  axios.get(`${BASE_URL}/search`, {
    headers: { Authorization: req.headers.authorization },
    params: req.query, // Corrected placement of params
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Get paginated articles
router.get('/paginate', (req, res) => {
  axios.get(`${BASE_URL}/paginate`, {
    headers: { Authorization: req.headers.authorization },
    params: req.query, // Corrected placement of params
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Filter articles by tag
router.get('/filter', (req, res) => {
  axios.get(`${BASE_URL}/filter`, {
    headers: { Authorization: req.headers.authorization },
    params: req.query, // Corrected placement of params
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Count all articles
router.get('/count', (req, res) => {
  axios.get(`${BASE_URL}/count`, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Get an article by ID
router.get('/:id', (req, res) => {
  axios.get(`${BASE_URL}/${req.params.id}`, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Update an article by ID
router.put('/:id', (req, res) => {
  axios.put(`${BASE_URL}/${req.params.id}`, req.body, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

// Delete an article by ID
router.delete('/:id', (req, res) => {
  axios.delete(`${BASE_URL}/${req.params.id}`, {
    headers: { Authorization: req.headers.authorization },
  })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => res.status(err.response?.status || 500).send(err.response?.data || err.message));
});

module.exports = router;
