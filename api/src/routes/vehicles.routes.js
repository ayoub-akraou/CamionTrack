import express from "express";
import { VehicleController } from "../controllers/vehicle.controller.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router.post("/", catchAsync(VehicleController.store));
router.get("/", catchAsync(VehicleController.index));
router.get("/", catchAsync(VehicleController.getAvailablesVehicles));
router.get("/", catchAsync(VehicleController.getOnTripVehicles));
router.get("/:id", catchAsync(VehicleController.show));
router.put("/:id", catchAsync(VehicleController.update));
router.delete("/:id", catchAsync(VehicleController.destroy));

export default router;
