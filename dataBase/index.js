const { Sequelize } = require('sequelize');

module.exports = () => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('Sep-2020', 'user', 'user', { dialect: 'mysql' });

        return client;
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();

                return instance;
            }
        }
    };
};
