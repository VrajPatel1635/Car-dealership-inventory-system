const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    return vehicle;
};
