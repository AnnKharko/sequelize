const { userValidator } = require('../validator');

module.exports = {
    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
            // res.status(404).json(e.message);
        }
    }
};
