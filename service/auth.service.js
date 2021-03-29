const db = require('../dataBase').getInstance();
const { ErrorHandler, errorCodes, errorCustomCodes } = require('../error');
const { tokenizer, passwordHasher } = require('../helper');

module.exports = {
    authUser: async (password, email) => {
        const User = db.getModel('User');
        const O_Auth = db.getModel('O_Auth');
        O_Auth.belongsTo(User, { foreignKey: 'user' });

        const user = await User.findAll({ where: { email } });

        if (!user) {
            // throw new Error('USER NOT FOUND');
            throw new ErrorHandler(errorCodes.NOT_FOUND, errorCustomCodes.USER_NOT_FOUND);
        }

        await passwordHasher.compare(password, user[0].dataValues.password);

        const tokens = await tokenizer();
        await O_Auth.create({ ...tokens, user: user[0].dataValues.id });
        // const xxx = await O_Auth.findAll({
        //     include: {
        //         model: User,
        //         where: { id: user[0].dataValues.id }
        //         // required: true,
        //     }
        // });
        return tokens;
    },
    refreshToken: (id, user) => {
        const O_Auth = db.getModel('O_Auth');

        const tokens = tokenizer();
        O_Auth.update({ ...tokens, user }, {
            where: { id }
        });

        return tokens;
    }
};
