'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions_roles', {
      roles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      permissions_id: {
        type: Sequelize.INTEGER, // Corrigido o erro aqui
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });

    await queryInterface.addConstraint('permissions_roles', {
      fields: ['roles_id', 'permissions_id'],
      type: 'primary key',
      name: 'pk_permissions_roles'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions_roles');
  }
};
