'use strict';
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definir associações aqui
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  });
  return User;
};
