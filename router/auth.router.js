const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');
//
// router.get('/', controller.getAllUsers);
router.post('/', authController.authUser);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
//
// router.use('/:id', middleware.checkIsPresent);
// router.get('/:id', controller.getUser);
// router.delete('/:id', controller.delete);

module.exports = router;
