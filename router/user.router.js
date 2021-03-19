const router = require('express').Router();

const { userController } = require('../controller');
// const { middleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
