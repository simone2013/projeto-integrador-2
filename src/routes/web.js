const express = require('express');
const router = express.Router();
const AuthController = require('../http/controllers/AuthController')
const UserController = require('../http/controllers/Auth/UserController')
const CrudController = require('../http/controllers/Auth/CrudController')

router.get('/', AuthController.index);
router.get('/create', AuthController.create);
router.get('/pagina-inicial', CrudController.findDonations);
router.get('/usuarios', CrudController.donations);
router.get('/produtos', CrudController.products);
router.get('/distribuicao', CrudController.distribuition);
router.get('/doacoes', CrudController.donationResource);
router.get('/dashboard', CrudController.dashboardResource);

module.exports = router;