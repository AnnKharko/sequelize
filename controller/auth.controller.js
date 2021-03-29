const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        const { password, email } = req.body;

        try {
            const tokens = await authService.authUser(password, email);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { id, user } = req.tokenInfo;
            // console.log('|||||||||||||||||||||||||||||||');
            // console.log(req.tokenInfo);
            // console.log('|||||||||||||||||||||||||||||||');

            const tokens = await authService.refreshToken(id, user);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
