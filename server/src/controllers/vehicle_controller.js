const vehicleService = require('../services/vehicle_service');

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.searchVehicles(req.query);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.purchaseVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.purchaseVehicle(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        if (error.message === 'Vehicle not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Out of stock') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
