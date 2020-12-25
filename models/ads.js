var db = require('../database/db');
var Sequelize = require('sequelize');
var ads = db.define('Ads', {
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
    link: {
        type: Sequelize.STRING
    },
    thumbnail: {
        type: Sequelize.STRING
    }

});

ads.sync().then(function() {
    console.log("created");
});
module.exports = ads;