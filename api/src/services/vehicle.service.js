import { VehicleRepository } from "../repositories/vehicle.repository.js";

export class VehicleService {
  static async createVehicle(vehicleData) {
    return await VehicleRepository.create(vehicleData);
  }

  static async getAllVehicles() {
    return await VehicleRepository.findAll();
  }

  static async getVehicleById(id) {
    return await VehicleRepository.findById(id);
  }
 
}
