const express = require('express');
const router = express.Router();
const AuthController = require('../http/controllers/AuthController')
const UserController = require('../http/controllers/auth/UserController')

router.get('/', AuthController.index);
router.get('/create', AuthController.create);
router.get('/findDonations', UserController.findDonations);
module.exports = router;