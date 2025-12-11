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

  static async getTripById(id) {
    return await TripRepository.findById(id);
  }

  static async updateTrip(id, updateData) {
    return await TripRepository.update(id, updateData);
  }

  static async deleteTrip(id) {
    return await TripRepository.remove(id);
  }

  static async endTrip(id) {
    const updatedTrip = await TripRepository.endTrip(id);

    if (!updatedTrip) {
      throw new AppError("Trajet non trouvé", 404);
    }

    return updatedTrip;
  }

  static async updateTripStatus(id, status) {
    return await TripRepository.updateTripStatus(id, status);
  }

  static async getDriverTrips(driverId) {
    return await TripRepository.getDriverTrips(driverId);
  }

  static async getVehicleTrips(vehicleId) {
    return await TripRepository.getVehicleTrips(vehicleId);
  }
}
