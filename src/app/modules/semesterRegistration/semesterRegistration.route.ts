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

router.get(
	"/get-all-semester-registration",
	semesterRegistrationController.getAllSemesterRegistrationIntoDb
);

export const semesterRegistrationRouter = router;
