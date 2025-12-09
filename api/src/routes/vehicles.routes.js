import express from "express";
import { VehicleController } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/", VehicleController.store);
router.get("/", VehicleController.index);

export default router;
