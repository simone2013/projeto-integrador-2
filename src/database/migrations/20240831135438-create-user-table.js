'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      birth_date: {
        type: Sequelize.DATEONLY, 
        allowNull: true         
      },
      gender: {
        type: Sequelize.ENUM('M', 'F', 'Other'), 
        allowNull: true       
      },
      user_type: {
        type: Sequelize.ENUM('admin', 'user', 'guest'),
        allowNull: true 
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: true
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true           
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};