import { Router } from "express";
import { validateBody } from "../middleware/validation.ts";
import {z} from'zod'
import { authenticateToken } from "../middleware/auth.ts";
import { createHabitSchema } from "../middleware/db_validation.ts";
import { createHabit, getUserHabits, updateHabit } from "../controllers/habitController.ts";

const router = Router();
router.use(authenticateToken)
// Habit-specific routes
router.get("/", getUserHabits);

router.post("/",validateBody(createHabitSchema), createHabit);

router.patch('/:id',updateHabit)



export default router;
