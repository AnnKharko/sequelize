const { userService } = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll();

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
        try {
            console.log(req.body);
            await userService.createOne(req.body);

            res.json('User is created');
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            await userService.deleteOne(id);

            res.json('USER IS DELETED');
        } catch (e) {
            next(e);
        }
    }
};
