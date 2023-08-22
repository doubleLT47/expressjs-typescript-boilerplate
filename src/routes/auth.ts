import express, { Router } from "express";
import AuthController from "@controllers/auth";
import validate from "@middleware/validate";
import { loginSchema } from "@validations/auth";
const router: Router = express.Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/new-password", AuthController.newPassword);

export default router;
