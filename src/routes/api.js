const express = require('express');
const router = express.Router();
const HomeController = require('../api/controllers/AuthController');

router.get('/', HomeController.home)

module.exports = router;