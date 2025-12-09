import express from "express";
import { TripController } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/", TripController.store);
router.get("/", TripController.index);
router.get("/:id", TripController.show);

export default router;
