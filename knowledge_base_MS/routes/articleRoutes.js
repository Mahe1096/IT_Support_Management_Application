const express = require('express');
const {
    createArticle,
    getArticles,
    searchArticles,
    updateArticle,
    deleteArticle,
    getArticleById,
    getPaginatedArticles,
    filterArticlesByTag,
    countArticles,
} = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
// Create a new article
router.post('/', createArticle);

// Get all articles
router.get('/', getArticles);

// Search articles by query
router.get('/search', searchArticles);

// Get paginated articles
router.get('/paginate', getPaginatedArticles);

// Filter articles by tag
router.get('/filter', filterArticlesByTag);

// Count all articles
router.get('/count', countArticles);

// Dynamic routes (must come after static routes)
// Get an article by ID
router.get('/:id', getArticleById);

// Update an article by ID
router.put('/:id', updateArticle);

// Delete an article by ID
router.delete('/:id', deleteArticle);

module.exports = router;
