import { Router } from "express";
import configController from "../controllers/configuration.controller.js";

const router = Router();

// router.use(authMiddleware);

router.get("/", configController.getConfiguration);
router.patch("/", configController.updateConfiguration);

export default router;
