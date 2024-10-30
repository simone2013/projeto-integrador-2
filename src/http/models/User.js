'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relação one-to-many com PasswordResetToken
      User.hasMany(models.PasswordResetToken, {
        foreignKey: 'user_id',
        as: 'passwordResetTokens',
        onUpdate: 'CASCADE'
      });

      // Relação many-to-many com Role
      User.belongsToMany(models.Role, {
        through: 'users_roles', 
        foreignKey: 'user_id', 
        otherKey: 'role_id',  
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });

      // Relação many-to-many com Permission
      User.belongsToMany(models.Permission, {
        through: 'users_permissions', 
        foreignKey: 'user_id',
        otherKey: 'permission_id',
        onUpdate: 'CASCADE'
      });
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
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  return User;
};
