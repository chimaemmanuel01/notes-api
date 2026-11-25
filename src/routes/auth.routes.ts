import { Router } from "express";
import { validate } from "../middleware/validation.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import {
    registerUser,
    loginUser
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;