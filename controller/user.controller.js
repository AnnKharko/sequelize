const { constant } = require('../constant');
const { passwordHasher } = require('../helper');
const { statusCodes } = require('../error');
const { transactionInstance } = require('../dataBase').getInstance();
const { userService } = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findOne(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { password } = req.body;
            const hashPassword = await passwordHasher.hash(password);

            await userService.createOne({ ...req.body, password: hashPassword }, transaction);

            await transaction.commit();
            res.status(statusCodes.CREATED).json(constant.USER_IS_CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            await userService.deleteOne(id);

            res.status(statusCodes.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
