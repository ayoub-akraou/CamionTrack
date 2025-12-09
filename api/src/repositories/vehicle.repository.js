import Vehicle from "../models/vehicle.model.js";

export class VehicleRepository {
  static async create(vehicleData) {
    const vehicle = new Vehicle(vehicleData);
    return await vehicle.save();
  }

  static async findAll() {
    return await Vehicle.find({}).sort({ createdAt: -1 });
  }

  static async findById(id) {
    return await Vehicle.findById(id);
  }

  static async update(id, updateData) {
    return await Vehicle.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  static async remove(id) {
    return await Vehicle.findByIdAndDelete(id);
  }
}
