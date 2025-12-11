import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import catchAsync from "../catchAsync.js";
const router = Router();

router.post("/register", catchAsync(AuthController.register));
router.post("/login", catchAsync(AuthController.login));
export default router;
