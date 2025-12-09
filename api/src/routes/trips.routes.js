import express from "express";
import { TripController } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/", TripController.store);
router.get("/", TripController.index);
router.get("/:id", TripController.show);
router.put("/:id", TripController.update);

export default router;
