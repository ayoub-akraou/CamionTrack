import { VehicleService } from "../services/vehicle.service.js";

export class VehicleController {
  static async store(req, res) {
    const vehicle = await VehicleService.createVehicle(req.body);
    res.status(201).json({ success: true, data: vehicle });
  }

  static async index(req, res) {
    const vehicles = await VehicleService.getAllVehicles();
    res.json({ success: true, data: vehicles });
  }

  static async getAvailablesVehicles(req, res) {
    const vehicles = await VehicleService.getAvailablesVehicles();
    res.json({ success: true, data: vehicles });
  }

  static async getOnTripVehicles(req, res) {
    const vehicles = await VehicleService.getOnTripVehicles();
    res.json({ success: true, data: vehicles });
  }

  static async show(req, res) {
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Véhicule non trouvé" });
    }

    res.json({ success: true, data: vehicle });
  }

  static async update(req, res) {
    const updatedVehicle = await VehicleService.updateVehicle(
      req.params.id,
      req.body
    );
    if (!updatedVehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Véhicule non trouvé" });
    }
    res.json({ success: true, data: updatedVehicle });
  }

  static async destroy(req, res) {
    const deletedVehicle = await VehicleService.deleteVehicle(req.params.id);
    if (!deletedVehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Véhicule non trouvé" });
    }
    res.json({ success: true, message: "Véhicule supprimé avec succès" });
  }
}
