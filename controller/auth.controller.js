const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        const { password, email } = req.body;

        try {
            await authService.authUser(password, email);

            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
