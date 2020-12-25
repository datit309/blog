var db = require('../database/db');
var Sequelize = require('sequelize');

var Category = db.define('Category', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    parent: {
        type: Sequelize.UUID
    }
});

Category.sync().then(function() {
    console.log("created");
});
module.exports = Category;