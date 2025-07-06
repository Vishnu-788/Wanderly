import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyUser, logout);

export default router;
