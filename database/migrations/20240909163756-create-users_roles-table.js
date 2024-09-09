'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_roles', {
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      roles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });

    await queryInterface.addConstraint('users_roles', {
      fields: ['users_id', 'roles_id'],
      type: 'primary key',
      name: 'pk_users_roles'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_roles');
  }
};
