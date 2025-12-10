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

  static async index(req, res) {
    try {
      const trips = await TripService.getAllTrips();
      res.json({ success: true, data: trips });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: "Erreur lors de la récupération des trajets",
      });
    }
  }

  static async show(req, res) {
    try {
      const trip = await TripService.getTripById(req.params.id);

      if (!trip) {
        return res.status(error.statusCode || 500).json({
          success: false,
          message: "Trajet non trouvé",
        });
      }
      res.json({ success: true, data: trip });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Erreur lors de la récupération du trajet",
      });
    }
  }

  static async update(req, res) {
    try {
      const updatedTrip = await TripService.updateTrip(req.params.id, req.body);
      if (!updatedTrip) {
        return res.status(error.statusCode || 500).json({
          success: false,
          message: "Trajet non trouvé",
        });
      }
      res.json({ success: true, data: updatedTrip });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Erreur lors de la mise à jour du trajet",
      });
    }
  }

  static async destroy(req, res) {
    try {
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
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: "Erreur lors de la suppression du trajet",
      });
    }
  }

  static async updateStatus(req, res) {
    try {
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
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Erreur lors de la mise à jour du statut",
      });
    }
  }

  static async getDriverTrips(req, res) {
    try {
      const trips = await TripService.getDriverTrips(req.params.driverId);
      res.json({ success: true, data: trips });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: "Erreur lors de la récupération des trajets du conducteur",
      });
    }
  }

  static async getVehicleTrips(req, res) {
    try {
      const trips = await TripService.getVehicleTrips(req.params.vehicleId);
      res.json({ success: true, data: trips });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: "Erreur lors de la récupération des trajets du véhicule",
      });
    }
  }
}
