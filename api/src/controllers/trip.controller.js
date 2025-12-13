import { TripService } from "../services/trip.service.js";
import emailService from "../services/email.service.js";

export class TripController {
  static async store(req, res) {
    try {
      const trip = await TripService.createTrip(req.body);

      // Envoyer un email d'assignation au conducteur
      if (trip.driver && trip.driver.email) {
        const emailContent = {
          to: trip.driver.email,
          subject: "Nouvelle mission de transport",
          text: `Bonjour ${
            trip.driver.name || ""
          },\n          \nVous avez été assigné à une nouvelle mission de transport.\n
            Détails du trajet :\n- Départ: ${trip.origin}\n- Destination: ${
            trip.destination
          }\n- Date de début: ${new Date(
            trip.plannedStart
          ).toLocaleString()}\n- Date de fin prévue: ${new Date(
            trip.plannedEnd
          ).toLocaleString()}\n\nCordialement,\nL'équipe CamionTrack`,
          html: `
            <div>
              <p>Bonjour ${trip.driver.name || ""},</p>
              <p>Vous avez été assigné à une nouvelle mission de transport.</p>
              <h3>Détails du trajet :</h3>
              <ul>
                <li><strong>Départ:</strong> ${trip.origin}</li>
                <li><strong>Destination:</strong> ${trip.destination}</li>
                <li><strong>Date de début:</strong> ${new Date(
                  trip.plannedStart
                ).toLocaleString()}</li>
                <li><strong>Date de fin prévue:</strong> ${new Date(
                  trip.plannedEnd
                ).toLocaleString()}</li>
              </ul>
              <p>Cordialement,<br>L'équipe CamionTrack</p>
            </div>
          `,
        };

        try {
          await emailService.sendEmail(emailContent);
          console.log("Email d'assignation envoyé avec succès");
        } catch (error) {
          // Supprimer le trajet en cas d'échec d'envoi d'email
          await TripService.deleteTrip(trip.id);
          throw new Error(
            "Échec de l'envoi de l'email d'assignation. Le trajet a été annulé: " +
              error.message
          );
        }
      }

      res.status(201).json({
        success: true,
        message: "Trajet créé avec succès",
        data: trip,
      });
    } catch (error) {
      console.error("Erreur lors de la création du trajet:", error);
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Erreur lors de la création du trajet",
      });
    }
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

  static async endTrip(req, res) {
    const updatedTrip = await TripService.endTrip(req.params.id);
    res.json({ success: true, data: updatedTrip });
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
