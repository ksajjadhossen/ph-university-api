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
router.get(
	"/:semesterRegistrationId",
	semesterRegistrationController.getSingleSemesterRegistrationIntoDb
);
router.patch(
	"/:semesterRegistrationId",
	validateRequest(
		semesterRegistrationValidationSchema.updateSemesterRegistrationValidationSchema
	),
	semesterRegistrationController.updateSemesterRegistrationIntoDb
);
export const semesterRegistrationRouter = router;
