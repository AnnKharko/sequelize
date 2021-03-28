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
    }
};
