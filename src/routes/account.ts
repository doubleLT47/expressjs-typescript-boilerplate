import express, { Router } from "express";
import AccountController from "@controllers/web/account";
const router: Router = express.Router();

router.get("/profile", AccountController.profile);

export default router;
