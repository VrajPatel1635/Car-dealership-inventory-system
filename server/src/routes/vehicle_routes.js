const express = require('express');
const vehicleController = require('../controllers/vehicle_controller');
const verifyToken = require('../middleware/auth_middleware');
const requireAdmin = require('../middleware/admin_middleware');

const router = express.Router();

router.get('/search', vehicleController.searchVehicles);
router.get('/', vehicleController.getVehicles);
router.post('/:id/purchase', verifyToken, vehicleController.purchaseVehicle);
router.post('/', verifyToken, vehicleController.createVehicle);

// Admin-only operations
router.put('/:id', verifyToken, requireAdmin, vehicleController.updateVehicle);
router.post('/:id/restock', verifyToken, requireAdmin, vehicleController.restockVehicle);
router.delete('/:id', verifyToken, requireAdmin, vehicleController.deleteVehicle);

module.exports = router;
