import express from "express";
import { TripController } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/", TripController.store);
router.get("/", TripController.index);
router.get("/:id", TripController.show);
router.put("/:id", TripController.update);
router.delete("/:id", TripController.destroy);

// update status
router.patch("/:id/status", TripController.updateStatus);

// get driver trips
router.get("/driver/:driverId", TripController.getDriverTrips);
// get vehicle trips
router.get("/vehicle/:vehicleId", TripController.getVehicleTrips);

export default router;
