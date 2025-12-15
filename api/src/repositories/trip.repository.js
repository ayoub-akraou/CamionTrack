import Trip from "../models/trip.model.js";

export class TripRepository {
  static async create(tripData) {
    const trip = new Trip(tripData);
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

  static async endTrip(id) {
    const trip = await Trip.findById(id).populate("driver").populate("vehicle");
    if (!trip) throw new Error("Trip introuvable");

    trip.status = "completed";
    trip.actualEnd = new Date();

    const saves = [];

    if (trip.driver) {
      trip.driver.status = "available";
      saves.push(trip.driver.save());
    }

    if (trip.vehicle) {
      trip.vehicle.status = "available";
      saves.push(trip.vehicle.save());
    }

    saves.push(trip.save());

    return await Promise.all(saves);
  }

  static async findActiveTrips() {
    return await Trip.find({
      status: { $in: ["planned", "in_progress"] },
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }

  static async updateTripStatus(id, status) {
    return await Trip.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }

  static async getDriverTrips(driverId) {
    return await Trip.find({ driver: driverId }).sort({
      plannedStart: -1,
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }

  static async getVehicleTrips(vehicleId) {
    return await Trip.find({ vehicle: vehicleId }).sort({
      plannedStart: -1,
    })
      .populate("driver", "name email")
      .populate("vehicle", "plateNumber model");
  }
}
