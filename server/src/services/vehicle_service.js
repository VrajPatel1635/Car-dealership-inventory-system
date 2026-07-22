const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async () => {
    return await Vehicle.find({});
};

/**
 * Dynamically builds a MongoDB query to filter vehicles based on exact matches,
 * numeric price ranges, and a unified keyword search across multiple text fields.
 * 
 * @param {Object} query - The query parameters from the request.
 * @returns {Promise<Array>} List of matching Vehicle documents.
 */
exports.searchVehicles = async (query) => {
    const filter = {};
    if (query.make) filter.make = query.make;
    if (query.model) filter.model = query.model;
    if (query.fuelType) filter.fuelType = query.fuelType;
    if (query.transmission) filter.transmission = query.transmission;
    if (query.category) filter.category = query.category;

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
                    { color: new RegExp(word, 'i') },
                    { category: new RegExp(word, 'i') }
                ]
            }));
        }
    }

    return await Vehicle.find(filter);
};

/**
 * Processes a vehicle purchase by verifying inventory and decrementing stock.
 * Throws an error if the vehicle does not exist or is out of stock.
 * 
 * @param {String} id - The MongoDB ObjectId of the vehicle.
 * @returns {Promise<Object>} The updated Vehicle document.
 */
exports.purchaseVehicle = async (id) => {
    const vehicle = await Vehicle.findOneAndUpdate(
        { _id: id, stock: { $gt: 0 } },
        { $inc: { stock: -1 } },
        { new: true }
    );

    if (!vehicle) {
        const exists = await Vehicle.findById(id);
        if (!exists) {
            throw new Error('Vehicle not found');
        }
        throw new Error('Out of stock');
    }

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
    const vehicle = await Vehicle.findByIdAndUpdate(
        id,
        { $inc: { stock: quantity || 1 } },
        { new: true }
    );

    if (!vehicle) {
        throw new Error('Vehicle not found');
    }

    return vehicle;
};

exports.deleteVehicle = async (id) => {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    return vehicle;
};
