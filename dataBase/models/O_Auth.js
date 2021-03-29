const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const O_Auth = client.define(
        'O_Auth',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: { type: DataTypes.STRING },
            refresh_token: { type: DataTypes.STRING },
            user: { type: DataTypes.INTEGER }
        //     created_at: {
        //         type: DataTypes.DATE,
        //         // allowNull: false
        //     },
        //     updated_at: DataTypes.DATE,
        //     deleted_at: DataTypes.DATE
        },
        {
            tableName: 'o_auths',
            timestamps: false
        }
    );
    // O_Auth.associate = (models) => {
    //     O_Auth.belongsTo(models.User, { targetKey: 'user', foreignKey: 'authId' });
    // };

    return O_Auth;
};
