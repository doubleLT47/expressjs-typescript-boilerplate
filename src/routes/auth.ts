import express, { Router } from "express";
import AuthController from "@controllers/auth";
const router: Router = express.Router();

router.post("/login", AuthController.login);

export default router;
