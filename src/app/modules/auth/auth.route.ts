import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./auth.constant";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post(
	"/login",
	validateRequest(authValidation.loginValidationSchema),
	authController.logInUser
);
router.post(
	"/change-password",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	validateRequest(authValidation.changePasswordValidationSchema),
	authController.changePassword
);

export const AuthRoute = router;
