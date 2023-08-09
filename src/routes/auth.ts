import express, { Router } from "express";
import AuthController from "@controllers/auth";
const router: Router = express.Router();

router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/new-password", AuthController.newPassword);

export default router;
