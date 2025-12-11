import { Router } from "express";
import configController from "../controllers/configuration.controller.js";
import catchAsync from "../catchAsync.js";
const router = Router();

// router.use(authMiddleware);

router.get("/", catchAsync(configController.getConfiguration));
router.patch("/", catchAsync(configController.updateConfiguration));

export default router;
