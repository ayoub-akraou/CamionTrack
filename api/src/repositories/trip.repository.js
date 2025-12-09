import Trip from "../models/trip.model.js";

export class TripRepository {
  static async create(tripData) {
    const trip = new Trip(tripData);
    console.log(trip);

    return await trip.save();
  }

  static async findAll() {
    return await Trip.find({})
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model")
      .sort({ createdAt: -1 });
  }

  static async findActiveTrips() {
    return await Trip.find({
      status: { $in: ["planned", "in_progress"] },
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
}
