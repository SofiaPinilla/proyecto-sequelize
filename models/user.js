'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // aqui las relaciones
      User.hasMany(models.Post)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Por favor introduce tu nombre"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu correo",
        },
        isEmail: {
          msg: "Por favor introduce un correo valido",
        },
      },
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};