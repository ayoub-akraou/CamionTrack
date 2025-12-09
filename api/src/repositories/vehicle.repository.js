import Vehicle from "../models/vehicle.model.js";

export class VehicleRepository {
  static async create(vehicleData) {
    const vehicle = new Vehicle(vehicleData);
    return await vehicle.save();
  }
}
