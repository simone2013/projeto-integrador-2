const express = require('express');
const router = express.Router();
const UserController = require('../api/controllers/auth/UserController');
const authenticateToken = require('../api/middleware/auth');

router.use(authenticateToken);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.edit);
router.post('/users', UserController.register); // Cria um novo usuário
router.put('/users/:id', UserController.update); // Atualiza um usuário existente
router.delete('/users/:id', UserController.deleteUser); // Deleta um usuário existente

module.exports = router;
