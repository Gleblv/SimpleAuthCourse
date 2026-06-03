const Router = require('express');
const router = new Router();
const authController = require('./authController.js');

router.post('/registration', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;