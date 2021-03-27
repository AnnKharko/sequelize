const router = require('express').Router();

const { authController } = require('../controller');
// const { middleware } = require('../middlewares');
//
// router.get('/', controller.getAllUsers);
router.post('/', authController.authUser);
//
// router.use('/:id', middleware.checkIsPresent);
// router.get('/:id', controller.getUser);
// router.delete('/:id', controller.delete);

module.exports = router;
