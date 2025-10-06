import express from "express";

import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../validation/auth.js";
import { loginUserController, registerUserController, refreshSessionController, logoutUserController } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUserController);
router.post("/login", validateBody(loginSchema), loginUserController);
router.post("/refresh", refreshSessionController);
router.post("/logout", logoutUserController);
export default router;