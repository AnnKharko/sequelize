const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const User = client.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
                // allowNull: false
            },
            age: {
                type: DataTypes.INTEGER
                // allowNull: false
            },
            gender: {
                type: DataTypes.STRING
                // allowNull: false
            },
            email: {
                type: DataTypes.STRING
                // allowNull: false
            },
            password: {
                type: DataTypes.STRING
                // allowNull: false
            },
            role: {
                type: DataTypes.STRING
            },
            avatar: {
                type: DataTypes.STRING
                // allowNull: false
            },
            docs: {
                type: DataTypes.STRING
                // allowNull: false
            },
            videos: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
};
