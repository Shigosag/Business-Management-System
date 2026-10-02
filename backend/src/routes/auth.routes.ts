import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { authenticateJwt } from "../middleware/auth";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", authenticateJwt, getCurrentUser);

export default router;
