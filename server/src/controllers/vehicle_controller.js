const vehicleService = require('../services/vehicle_service');

const handleVehicleError = (res, error) => {
    if (error.message === 'Vehicle not found') {
        return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Out of stock' || error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
};

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
        handleVehicleError(res, error);
    }
};

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
        res.status(200).json(vehicle);
    } catch (error) {
        handleVehicleError(res, error);
    }
};

exports.restockVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.restockVehicle(req.params.id, req.body.quantity);
        res.status(200).json(vehicle);
    } catch (error) {
        handleVehicleError(res, error);
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        await vehicleService.deleteVehicle(req.params.id);
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        handleVehicleError(res, error);
    }
};
