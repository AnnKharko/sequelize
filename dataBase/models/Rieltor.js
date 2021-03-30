const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Rieltor = client.define(
        'Rieltor',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                required: true
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
                type: DataTypes.STRING,
                required: true
                // allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                required: true

                // allowNull: false
            },
            // role: {
            //     type: DataTypes.STRING
            // },
            role: {
                type: DataTypes.ENUM,
                values: [
                    'user',
                    'admin',
                    'disabled'
                ]
            },
            authId: {
                type: DataTypes.INTEGER
            },
            avatar: {
                type: DataTypes.STRING
                // allowNull: false
            },
            doc: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'rieltors',
            timestamps: false
        }
    );
    return Rieltor;
};
