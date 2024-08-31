const express = require('express');
const router = express.Router();
const HomeController = require('../api/controllers/AuthController');

router.get('/users', HomeController.index);
router.get('/users/:id', HomeController.edit);
router.post('/users', HomeController.create); // Cria um novo usuário
router.put('/users/:id', HomeController.update); // Atualiza um usuário existente
router.delete('/users/:id', HomeController.deleteUser); // Deleta um usuário existente

module.exports = router;
