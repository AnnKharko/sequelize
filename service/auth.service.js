const db = require('../dataBase').getInstance();
const { tokenizer, passwordHasher } = require('../helper');

module.exports = {
    authUser: async (password, email) => {
        const User = db.getModel('User');
        const O_Auth = db.getModel('O_Auth');

        const user = await User.findAll({ where: { email } });

        if (!user) {
            throw new Error('USER NOT FOUND');
        }

        await passwordHasher.compare(password, user[0].dataValues.password);

        const tokens = await tokenizer();
        await O_Auth.create({ ...tokens, user: user[0].dataValues.id });
        const xxx = await O_Auth.findAll({
            include: [{
                model: 'User'
                // where: {
                //     authId: 1
                // }
            }]
        });

        console.log('________________________-');
        console.log(xxx);
        console.log('________________________-');
        return tokens;
    }
};
