const { Sequelize } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('blog2', 'root', '123456', {
    host: 'localhost',
    dialect: "mysql"
});