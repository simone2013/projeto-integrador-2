const express = require('express');
const router = express.Router();
const AuthController = require('../http/controllers/AuthController')

router.get('/', AuthController.index);
router.get('/create', AuthController.create);
module.exports = router;