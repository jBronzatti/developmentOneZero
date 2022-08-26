const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }

User.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            isInt: true,
            notEmpty: true
        }
    }
},
    {
        sequelize,
        modelName: "Usuário"
    });

module.exports = User;