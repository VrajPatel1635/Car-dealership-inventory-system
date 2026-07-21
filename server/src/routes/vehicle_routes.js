const express = require('express');
const vehicleController = require('../controllers/vehicle_controller');
const verifyToken = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/', vehicleController.getVehicles);
router.post('/', verifyToken, vehicleController.createVehicle);

module.exports = router;
