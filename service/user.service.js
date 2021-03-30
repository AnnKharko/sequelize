const db = require('../dataBase').getInstance();

module.exports = {
    findAll: () => {
        const User = db.getModel('User');

        return User.findAll();
    },
    findOne: (userId) => {
        const User = db.getModel('User');

        return User.findAll({ where: { id: userId } });
    },
    createOne: (userObject, transaction) => {
        const User = db.getModel('User');

        return User.create(userObject, { transaction });
    },
    deleteOne: (id) => {
        const User = db.getModel('User');

        return User.destroy({ where: { id } });
    }
};
