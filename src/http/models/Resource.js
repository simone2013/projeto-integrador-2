'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
   
    static associate(models) {
      Resource.hasMany(models.Donation, {
        foreignKey: 'resource_id',
        as: 'donations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      
    }
  }

  Resource.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,

      },
    },
    {
      sequelize,
      modelName: 'Resource',
      tableName: 'resources',
      timestamps: true, // Mantém os campos createdAt e updatedAt
    }
  );

  return Resource;
};
