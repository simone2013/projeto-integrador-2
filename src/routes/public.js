const express = require('express');
const router = express.Router();
const AuthController = require('../http/controllers/AuthController')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/', AuthController.index);
module.exports = router;