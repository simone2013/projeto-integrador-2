'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    static associate(models) {
      // Relacionamento de "muitos para um" com User
      Distribution.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user', // Nome do alias para a relação
        onDelete: 'CASCADE', // Excluir as distribuições associadas se o usuário for excluído
        onUpdate: 'CASCADE', // Atualizar as distribuições se o usuário for atualizado
      });

      // Relacionamento de "muitos para um" com Resource
      Distribution.belongsTo(models.Resource, {
        foreignKey: 'resource_id',
        as: 'resource', // Nome do alias para a relação
        onDelete: 'CASCADE', // Excluir as distribuições associadas se o recurso for excluído
        onUpdate: 'CASCADE', // Atualizar as distribuições se o recurso for atualizado
      });
    }
  }

  Distribution.init({
    // Defina os campos do modelo de distribuição
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false, // A quantidade deve ser fornecida
    },
  }, {
    sequelize,
    modelName: 'Distribution',
    tableName: 'distributions',
    timestamps: true, // Usado para criar e atualizar as colunas createdAt e updatedAt
  });

  return Distribution;
};
