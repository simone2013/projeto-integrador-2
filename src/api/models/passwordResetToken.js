'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PasswordResetToken extends Model {
        static associate(models) {
            // Associações definidas aqui
            PasswordResetToken.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }

    PasswordResetToken.init({
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'PasswordResetToken',
        tableName: 'password_reset_tokens',
        underscored: true,
        timestamps: true,
    });

    return PasswordResetToken;
};
