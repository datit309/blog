var db = require('../database/db');
var Sequelize = require('sequelize');
var Roles = db.define('Roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING
    }

});

Roles.sync().then(function() {
    console.log("created");
});
// Find all users
Roles.findAll().then(function(tasks) {
    if (!tasks) {
        Roles.create({ id: 1, name: "Administrator" });
        Roles.create({ id: 2, name: "Editor" });
        Roles.create({ id: 3, name: "Author" });
        Roles.create({ id: 4, name: "Contributor" });
        Roles.create({ id: 5, name: "Subscribe" });
    }
});