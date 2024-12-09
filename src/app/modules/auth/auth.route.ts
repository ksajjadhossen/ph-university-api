import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.get(
	"/login",
	validateRequest(authValidation.loginValidationSchema),
	authController.logInUser
);
router.post(
	"/change-password",
	validateRequest(authValidation.changePasswordValidationSchema),
	authController.changePassword
);

export const AuthRoute = router;
