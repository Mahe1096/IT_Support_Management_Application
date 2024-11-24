const Article = require('../models/articleModel');

// Create a new article
const createArticle = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const article = new Article({ title, content, tags });
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search articles by query
const searchArticles = async (req, res) => {
    try {
        const query = req.query.q || '';
        const articles = await Article.find({
            title: { $regex: query, $options: 'i' }, // Case-insensitive search
        });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        article.title = title || article.title;
        article.content = content || article.content;
        article.tags = tags || article.tags;

        const updatedArticle = await article.save();
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaginatedArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const articles = await Article.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalArticles = await Article.countDocuments();

        res.status(200).json({
            totalArticles,
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            articles,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterArticlesByTag = async (req, res) => {
    try {
        const { tag } = req.query;

        if (!tag) {
            return res.status(400).json({ message: "Tag query is required" });
        }

        const articles = await Article.find({ tags: tag });

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const countArticles = async (req, res) => {
    try {
        const count = await Article.countDocuments();
        res.status(200).json({ totalArticles: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createArticle,
    getArticles,
    searchArticles,
    updateArticle,
    deleteArticle,
    getArticleById,
    getPaginatedArticles,
    filterArticlesByTag,
    countArticles
};
