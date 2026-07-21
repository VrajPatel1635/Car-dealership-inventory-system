const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async () => {
    return await Vehicle.find({});
};

exports.createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    return vehicle;
};
