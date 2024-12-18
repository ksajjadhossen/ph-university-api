import { Router } from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { semesterRegistrationController } from "./semesterRegistration.controller";
import { semesterRegistrationValidationSchema } from "./semesterRegistration.validation";

const router = Router();

router.post(
	"/create-semester-registration",
	Auth(USER_ROLE.admin),
	validateRequest(
		semesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema
	),
	semesterRegistrationController.createSemesterRegistrationIntoDb
);

router.get(
	"/get-all-semester-registration",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	semesterRegistrationController.getAllSemesterRegistrationIntoDb
);
router.get(
	"/:semesterRegistrationId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	semesterRegistrationController.getSingleSemesterRegistrationIntoDb
);
router.patch(
	"/:semesterRegistrationId",
	Auth(USER_ROLE.admin),
	validateRequest(
		semesterRegistrationValidationSchema.updateSemesterRegistrationValidationSchema
	),
	semesterRegistrationController.updateSemesterRegistrationIntoDb
);
export const semesterRegistrationRouter = router;
