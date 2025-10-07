import { Router } from "express";
import {
  deletePost,
  getUserController,
  registerUser,
} from "../src/controllers/users.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

//router.post("/login", authController.login);
router.post("/register", registerUser);
router.get("/me", verifyToken, getUserController);
router.delete("/delete/:email", deletePost);

export default router;
