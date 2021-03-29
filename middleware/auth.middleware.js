const jwt = require('jsonwebtoken');

const db = require('../dataBase').getInstance();
const { constant } = require('../constant');
const { ErrorHandler, errorCodes, errorCustomCodes } = require('../error');
const { JWT_ACCESS, JWT_REFRESH } = require('../configs/config');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        const O_Auth = db.getModel('O_Auth');
        try {
            const access_token = req.get(constant.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorCustomCodes.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorCustomCodes.NOT_VALID_TOKEN);
                }
            });

            const tokens = await O_Auth.findAll({
                where: { access_token }
            });

            if (!tokens) {
                throw new ErrorHandler(errorCodes.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_TOKEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        const O_Auth = db.getModel('O_Auth');
        try {
            const refresh_token = req.get(constant.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorCustomCodes.REFRESH_TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorCustomCodes.NOT_VALID_REFRESH_TOKEN);
                }
            });

            const tokens = await O_Auth.findAll({
                where: {
                    refresh_token
                }
            });

            if (!tokens) {
                throw new ErrorHandler(errorCodes.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_TOKEN);
            }
            req.tokenInfo = tokens[0].dataValues;

            next();
        } catch (e) {
            next(e);
        }
    }
};
