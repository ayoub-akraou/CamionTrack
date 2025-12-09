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

  static async findById(id) {
    return await Trip.findById(id)
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }

  static async update(id, updateData) {
    return await Trip.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }

  static async remove(id) {
    return await Trip.findByIdAndDelete(id);
  }

  static async findActiveTrips() {
    return await Trip.find({
      status: { $in: ["planned", "in_progress"] },
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
}
