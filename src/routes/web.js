const express = require('express');
const router = express.Router();
const AuthController = require('../http/controllers/AuthController')
const UserController = require('../http/controllers/Auth/UserController')
const CrudController = require('../http/controllers/Auth/CrudController')

router.get('/', AuthController.index);
router.get('/create', AuthController.create);
router.get('/findDonations', CrudController.findDonations);
router.get('/donations', CrudController.donations);
module.exports = router;