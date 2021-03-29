const { userValidator } = require('../validator');
const { ErrorHandler, errorCodes, errorCustomCodes } = require('../error');
const db = require('../dataBase').getInstance();

module.exports = {
    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorCustomCodes.BED_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserIdValid: async (req, res, next) => {
        try {
            const User = db.getModel('User');
            const { id } = req.params;

            const user = await User.findAll({ where: { id } });

            if (!user.length) {
                throw new ErrorHandler(errorCodes.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
