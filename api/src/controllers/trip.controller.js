import { TripService } from "../services/trip.service.js";

export class TripController {
  static async store(req, res) {
    try {
      const trip = await TripService.createTrip(req.body);
      res.status(201).json({ success: true, data: trip });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Erreur lors de la création du trajet",
      });
    }
  }
}
