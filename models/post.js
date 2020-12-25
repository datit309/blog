var db = require('../database/db');
var Sequelize = require('sequelize');
var Post = db.define('Post', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    category_id: {
        type: Sequelize.UUID
    },
    tag_id: {
        type: Sequelize.UUID
    },
    thumbnail: {
        type: Sequelize.STRING
    },
    author_id: {
        type: Sequelize.UUID
    }
});

Post.sync().then(function() {
    console.log("created");
});
module.exports = Post;