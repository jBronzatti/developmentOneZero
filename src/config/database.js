const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    dialect: "sqlite",
    host: './database.sqlite',
    logging: false
});

sequelize.sync().then(() => console.log("Conectado ao banco de dados!"));

module.exports = sequelize;

