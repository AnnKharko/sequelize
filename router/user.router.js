const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.use('/:id', userMiddleware.checkIsUserIdValid);
router.get('/:id', userController.getUser);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
