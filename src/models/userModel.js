const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:18
        }
    }
},
{
    sequelize,
    modelName: "Usuário"
});

module.exports = User;