import { VehicleRepository } from "../repositories/vehicle.repository.js";

export class VehicleService {
  static async createVehicle(vehicleData) {
    return await VehicleRepository.create(vehicleData);
  }
}
