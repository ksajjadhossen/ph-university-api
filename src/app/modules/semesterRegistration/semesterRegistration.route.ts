import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationController } from "./semesterRegistration.controller";
import { semesterRegistrationValidationSchema } from "./semesterRegistration.validation";

const router = Router();

router.post(
	"/create-semester-registration",
	validateRequest(
		semesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema
	),
	semesterRegistrationController.createSemesterRegistrationIntoDb
);

export const semesterRegistrationRouter = router;
