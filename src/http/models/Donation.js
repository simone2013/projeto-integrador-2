'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      // Relação com o modelo User (um-para-muitos)
      Donation.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user', // Nome do alias para o relacionamento
        onDelete: 'CASCADE', // Se o usuário for deletado, todas as doações associadas serão deletadas
        onUpdate: 'CASCADE', // Se o usuário for atualizado, as doações associadas serão atualizadas
      });

      // Relação com o modelo Resource (um-para-muitos)
      Donation.belongsTo(models.Resource, {
        foreignKey: 'resource_id',
        as: 'resource', // Nome do alias para o relacionamento
        onDelete: 'CASCADE', // Se o recurso for deletado, todas as doações associadas serão deletadas
        onUpdate: 'CASCADE', // Se o recurso for atualizado, as doações associadas serão atualizadas
      });
    }
  }

  Donation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nome da tabela referenciada
          key: 'id',
        },
        onDelete: 'CASCADE', // Deleta as doações se o usuário for deletado
        onUpdate: 'CASCADE', // Atualiza as doações se o usuário for atualizado
      },
      resource_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'resources', // Nome da tabela referenciada
          key: 'id',
        },
        onDelete: 'CASCADE', // Deleta as doações se o recurso for deletado
        onUpdate: 'CASCADE', // Atualiza as doações se o recurso for atualizado
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valor default se não for fornecido
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Valor padrão: data de criação
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Valor padrão: data de atualização
      },
    },
    {
      sequelize,
      modelName: 'Donation',
      tableName: 'donations', // Nome da tabela
      timestamps: true, // Mantém os campos createdAt e updatedAt
    }
  );

  return Donation;
};
