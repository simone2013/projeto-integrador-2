const express = require('express');
const router = express.Router();
const {userPermissions, userRoles} = require('../http/middleware/permissions');

const UserController = require('../http/controllers/auth/UserController');
const RoleController = require('../http/controllers/auth/RoleController');
const CreateUserAccessControlListController = require('../http/controllers/auth/CreateUserAccessControlListController');
const PermissionController = require('../http/controllers/auth/PermissionController');
const CreateRolePermissionController = require('../http/controllers/auth/CreateRolePermissionController');

const authenticateToken = require('../http/middleware/auth');

router.use(authenticateToken);

// Rotas de usuários
router.get('/users', UserController.index);
router.get('/users/:id', UserController.edit);
router.post('/users',authenticateToken, UserController.create); 
router.put('/users/:id', UserController.update); 
router.delete('/users/:id', UserController.deleteUser);


// Rotas de roles
router.get('/roles', RoleController.index);
router.get('/roles/:id', RoleController.edit);
router.post('/roles', RoleController.create); 
router.put('/roles/:id', RoleController.update); 
router.delete('/roles/:id', RoleController.destroy);

// Rotas de permissions
router.get('/permissions', PermissionController.index); // Lista todas as permissões
router.get('/permissions/:id', PermissionController.edit); // Exibe uma permissão específica
router.post('/permissions', PermissionController.create); // Cria uma nova permissão
router.put('/permissions/:id', PermissionController.update); // Atualiza uma permissão
router.delete('/permissions/:id', PermissionController.destroy); // Deleta uma permissão

// CreateUserAccess
router.post('/users/:id/access', CreateUserAccessControlListController.CreateUserAccess);

//CreateRolePermission
router.post('/roles/:id', CreateRolePermissionController.Create);



module.exports = router;
