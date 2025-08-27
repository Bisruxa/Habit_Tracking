import { Router } from "express";
import { validateBody } from "../middleware/validation.ts";
import {z} from'zod'
import { authenticateToken } from "../middleware/auth.ts";
const createHabitSchema=z.object({
  name:z.string()
})
const router = Router();
router.use(authenticateToken)
// Habit-specific routes
router.get("/", (req, res) => {
  res.json({ message: "Get all habits" });
});

router.post("/",validateBody(createHabitSchema), (req, res) => {
  res.status(201).json({ message: "Habit created" });
});

// Habit completion routes
router.post("/:id/complete", (req, res) => {
  res.json({ message: `Mark habit ${req.params.id} complete` });
});

router.get("/:id/stats", (req, res) => {
  res.json({ message: `Get stats for habit ${req.params.id}` });
});

export default router;
