const express = require('express');
const router = express.Router();
const {userPermissions, userRoles} = require('../http/middleware/permissions');

const UserController = require('../http/controllers/auth/UserController');
const RoleController = require('../http/controllers/auth/RoleController');
const ResourceController = require('../http/controllers/Auth/ResourceController')
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

// Rota de recursos

router.get('/resource', ResourceController.index);
router.get('/resource/:id', ResourceController.edit);
router.post('/resource', ResourceController.create); 
router.put('/resource/:id', ResourceController.update); 
router.delete('/resource/:id', ResourceController.deleteResource);


// CreateUserAccess
router.post('/users/:id/access', CreateUserAccessControlListController.CreateUserAccess);

//CreateRolePermission
router.post('/roles/:id', CreateRolePermissionController.Create);



module.exports = router;
