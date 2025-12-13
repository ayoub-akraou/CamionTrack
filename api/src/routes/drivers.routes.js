import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import DriverController from "../controllers/driver.controller.js";

const router = Router();
router.get("/", catchAsync(DriverController.getDrivers));

export default router;