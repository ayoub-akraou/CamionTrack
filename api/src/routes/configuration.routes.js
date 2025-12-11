import { Router } from "express";
import configController from "../controllers/configuration.controller.js";
import catchAsync from "../utils/catchAsync.js";
import authorize from "../middleware/authorization.middleware.js";
const router = Router();

router.get("/", catchAsync(configController.getConfiguration));
router.patch(
  "/",
  authorize("admin"),
  catchAsync(configController.updateConfiguration)
);

export default router;
