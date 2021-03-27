const db = require('../dataBase').getInstance();
const { passwordHasher } = require('../helper');

module.exports = {
    authUser: async (password, email) => {
        const User = db.getModel('User');

        const user = await User.findAll({ where: { email } });

        if (!user) {
            throw new Error('USER NOT FOUND');
        }

        const isEqual = await passwordHasher.compare(password, user.password); // ?????????
        return isEqual;
    }
};
