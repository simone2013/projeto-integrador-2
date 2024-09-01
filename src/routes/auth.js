const express = require('express');
const router = express.Router();
const UserController = require('../api/controllers/auth/UserController');
const authenticateToken = require('../api/middleware/auth');

router.use(authenticateToken);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.edit);
router.post('/users', UserController.create); 
router.put('/users/:id', UserController.update); 
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
