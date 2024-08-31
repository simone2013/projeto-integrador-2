const express = require('express');
const router = express.Router();
const HomeController = require('../api/controllers/AuthController');

router.get('/', HomeController.getAllUsers)

module.exports = router;