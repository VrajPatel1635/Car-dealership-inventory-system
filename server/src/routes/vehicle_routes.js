const express = require('express');
const vehicleController = require('../controllers/vehicle_controller');
const verifyToken = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/search', vehicleController.searchVehicles);
router.get('/', vehicleController.getVehicles);
router.post('/:id/purchase', verifyToken, vehicleController.purchaseVehicle);
router.post('/', verifyToken, vehicleController.createVehicle);

module.exports = router;
