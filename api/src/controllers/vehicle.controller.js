import { VehicleService } from "../services/vehicle.service.js";

export class VehicleController {
  static async store(req, res) {
    try {
      const vehicle = await VehicleService.createVehicle(req.body);
      res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async index(req, res) {
    try {
      const vehicles = await VehicleService.getAllVehicles();
      res.json({ success: true, data: vehicles });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  }
}
}
