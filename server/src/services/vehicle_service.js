const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async () => {
    return await Vehicle.find({});
};

exports.searchVehicles = async (query) => {
    const filter = {};
    if (query.make) filter.make = query.make;
    if (query.model) filter.model = query.model;
    if (query.fuelType) filter.fuelType = query.fuelType;
    if (query.transmission) filter.transmission = query.transmission;
    
    if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }
    
    if (query.query) {
        const words = query.query.trim().split(/\s+/);
        if (words.length > 0) {
            filter.$and = words.map(word => ({
                $or: [
                    { make: new RegExp(word, 'i') },
                    { model: new RegExp(word, 'i') },
                    { color: new RegExp(word, 'i') }
                ]
            }));
        }
    }
    
    return await Vehicle.find(filter);
};

exports.purchaseVehicle = async (id) => {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    if (vehicle.stock <= 0) {
        throw new Error('Out of stock');
    }
    
    vehicle.stock -= 1;
    await vehicle.save();
    return vehicle;
};

exports.createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    return vehicle;
};

exports.updateVehicle = async (id, updateData) => {
    const vehicle = await Vehicle.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    return vehicle;
};

exports.restockVehicle = async (id, quantity) => {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    vehicle.stock += (quantity || 1);
    await vehicle.save();
    return vehicle;
};

exports.deleteVehicle = async (id) => {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    return vehicle;
};
