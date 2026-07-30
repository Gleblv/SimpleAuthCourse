const Router = require('express');
const router = new Router();
const authController = require('./authController.js');
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware.js');
const roleMiddleware = require('./middleware/roleMiddleware.js');

router.post('/registration', [
    check('username', 'Username empty').notEmpty(),
    check('password', 'Password length').isLength({min: 4, max: 10})
], authController.register);
router.post('/login', authController.login);
router.get('/users', roleMiddleware(['USER', 'ADMIN']), authController.getUsers);

module.exports = router;