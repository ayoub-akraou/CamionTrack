import { TripRepository } from "../repositories/trip.repository.js";

export class TripService {
  static async createTrip(tripData) {
    // verifier les conflits de dates pour le vehicule
    const existingTrips = await TripRepository.findActiveTrips();
    const hasConflict = existingTrips.some((trip) => {
      return (
        trip?.vehicle?.id?.toString() === tripData.vehicle?.toString() &&
        ((tripData.plannedStart >= trip.plannedStart &&
          tripData.plannedStart <= trip.plannedEnd) ||
          (tripData.plannedEnd >= trip.plannedStart &&
            tripData.plannedEnd <= trip.plannedEnd))
      );
    });

    if (hasConflict) {
      throw new Error("Le véhicule est déjà réservé pour cette période");
    }

    return await TripRepository.create(tripData);
  }

  static async getAllTrips() {
    return await TripRepository.findAll();
  }

}
