import { Router } from "express";
import {login, register} from "../controllers/authController.ts"
import { validateBody } from "../middleware/validation.ts";
import { createUserSchema, loginSchema } from "../middleware/db_validation.ts";
const router = Router();

// Authentication routes
router.post("/register", validateBody(createUserSchema),register);

router.post("/login", validateBody(loginSchema),login);

router.post("/logout", (req, res) => {
  res.json({ message: "User logged out" });
});

router.post("/refresh", (req, res) => {
  res.json({ message: "Token refreshed" });
});

export default router;
