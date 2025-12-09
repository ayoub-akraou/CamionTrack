import express from "express";
import { TripController } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/", TripController.store);

export default router;
