const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [String],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
