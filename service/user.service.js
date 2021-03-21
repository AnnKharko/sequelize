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
    createOne: (userObject) => {
        const User = db.getModel('User');

        return User.create(userObject);
    },
    deleteOne: (id) => {
        const User = db.getModel('User');

        return User.destroy({ where: { id } });
    }
};
