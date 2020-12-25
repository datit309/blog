var db = require('../database/db');
var Sequelize = require('sequelize');
var Users = db.define('Users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    sdt: {
        type: Sequelize.STRING
    },
    roles_id: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    }

});

Users.sync().then(function() {
    console.log("created");
});
module.exports = Users;