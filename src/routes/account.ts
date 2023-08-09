import express, { Router } from "express";
import AccountController from "@controllers/account";
import AuthMiddleware from "@middleware/auth";

const router: Router = express.Router();

router.get("/profile", AuthMiddleware, AccountController.profile);

export default router;
