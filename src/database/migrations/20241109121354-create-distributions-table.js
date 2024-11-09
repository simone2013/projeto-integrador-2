'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('distributions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremento para o ID
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Tabela relacionada
          key: 'id', // Coluna de referência
        },
        onDelete: 'CASCADE', // Ao excluir um usuário, exclui as distribuições associadas
        onUpdate: 'CASCADE', // Se o usuário for atualizado, as distribuições também serão atualizadas
      },
      resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'resources', // Tabela relacionada
          key: 'id', // Coluna de referência
        },
        onDelete: 'CASCADE', // Ao excluir um recurso, exclui as distribuições associadas
        onUpdate: 'CASCADE', // Se o recurso for atualizado, as distribuições também serão atualizadas
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false, // A quantidade deve ser fornecida
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Define o valor padrão como o timestamp atual
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Define o valor padrão como o timestamp atual
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('distributions'); // Reverte a criação da tabela
  }
};
