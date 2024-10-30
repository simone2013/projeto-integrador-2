'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Relação many-to-many com User
      Role.belongsToMany(models.User, {
        through: 'users_roles', // Nome da tabela intermediária
        foreignKey: 'role_id',  // Chave estrangeira na tabela intermediária
        otherKey: 'user_id',    // Outra chave estrangeira na tabela intermediária
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });

      // Relação many-to-many com Permission
      Role.belongsToMany(models.Permission, {
        through: 'permissions_roles', // Nome da tabela intermediária
        foreignKey: 'role_id',        // Chave estrangeira na tabela intermediária
        otherKey: 'permission_id',    // Outra chave estrangeira na tabela intermediária
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }

  Role.init({
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
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true
  });

  return Role;
};
