import { TripService } from "../services/trip.service.js";

export class TripController {
  static async store(req, res) {
    const trip = await TripService.createTrip(req.body);
    res.status(201).json({ success: true, data: trip });

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Erreur lors de la création du trajet",
    });
  }

  static async index(req, res) {
    const trips = await TripService.getAllTrips();
    res.json({ success: true, data: trips });
  }

  static async show(req, res) {
    const trip = await TripService.getTripById(req.params.id);

    if (!trip) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: "Trajet non trouvé",
      });
    }

    res.json({ success: true, data: trip });
  }

  static async update(req, res) {
    const updatedTrip = await TripService.updateTrip(req.params.id, req.body);

    if (!updatedTrip) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: "Trajet non trouvé",
      });
    }

    res.json({ success: true, data: updatedTrip });
  }

  static async destroy(req, res) {
    const deletedTrip = await TripService.deleteTrip(req.params.id);

    if (!deletedTrip) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: "Trajet non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Trajet supprimé avec succès",
    });
  }

  static async updateStatus(req, res) {
    const { status } = req.body;
    const updatedTrip = await TripService.updateTripStatus(
      req.params.id,
      status
    );

    if (!updatedTrip) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: "Trajet non trouvé",
      });
    }

    res.json({ success: true, data: updatedTrip });
  }

  static async getDriverTrips(req, res) {
    const trips = await TripService.getDriverTrips(req.params.driverId);
    res.json({ success: true, data: trips });
  }

  static async getVehicleTrips(req, res) {
    const trips = await TripService.getVehicleTrips(req.params.vehicleId);
    res.json({ success: true, data: trips });
  }
}
