import express from "express";

import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema, requestPasswordResetSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginUserController, registerUserController, refreshSessionController, logoutUserController, requestPasswordResetController, resetPasswordController } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUserController);
router.post("/login", validateBody(loginSchema), loginUserController);
router.post("/refresh", refreshSessionController);
router.post("/logout", logoutUserController);
router.post("/send-reset-email", validateBody(requestPasswordResetSchema), requestPasswordResetController);
router.post('/reset-pwd', validateBody(resetPasswordSchema), resetPasswordController,);

export default router;