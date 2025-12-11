import express from "express";
import { TripController } from "../controllers/trip.controller.js";
import catchAsync from "../utils/catchAsync.js";
import authorize from "../middleware/authorization.middleware.js";
const router = express.Router();

router.post("/", authorize("admin"), catchAsync(TripController.store));
router.get("/", catchAsync(TripController.index));
router.get("/:id", catchAsync(TripController.show));
router.put("/:id", catchAsync(TripController.update));
router.delete("/:id", catchAsync(TripController.destroy));
// end trip
router.patch("/:id/end", catchAsync(TripController.endTrip));
// update status
router.patch("/:id/status", catchAsync(TripController.updateStatus));

// get driver trips
router.get("/driver/:driverId", catchAsync(TripController.getDriverTrips));
// get vehicle trips
router.get("/vehicle/:vehicleId", catchAsync(TripController.getVehicleTrips));

export default router;
