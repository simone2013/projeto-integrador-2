'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // Relação many-to-many com User
      Permission.belongsToMany(models.User, {
        through: 'users_permissions', // Nome da tabela intermediária
        foreignKey: 'permission_id',  // Chave estrangeira na tabela intermediária
        otherKey: 'user_id',          // Outra chave estrangeira na tabela intermediária
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });

      // Relação many-to-many com Role
      Permission.belongsToMany(models.Role, {
        through: 'permissions_roles', // Nome da tabela intermediária
        foreignKey: 'permission_id',  // Chave estrangeira na tabela intermediária
        otherKey: 'role_id',          // Outra chave estrangeira na tabela intermediária
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }

  Permission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: true
  });

  return Permission;
};
