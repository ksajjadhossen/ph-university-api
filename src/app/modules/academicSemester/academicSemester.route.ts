import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { academicSemesterController } from "./academicSemester.controller";
import { academicSemesterValidation } from "./academicSemester.validation";
const router = express.Router();

router.post(
	"/create-academic-semester",
	Auth(USER_ROLE.admin),
	validateRequest(
		academicSemesterValidation.createAcademicSemesterValidationSchema
	),
	academicSemesterController.createAcademicSemester
);

router.get(
	"/",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicSemesterController.getAllAcademicSemester
);
router.get(
	"/:semesterId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicSemesterController.findSingleSemesterById
);
router.patch(
	"/:semesterId",
	Auth(USER_ROLE.admin),
	validateRequest(
		academicSemesterValidation.createAcademicSemesterValidationSchema
	),
	academicSemesterController.updateSemesterById
);

export const academicSemesterRouter = router;
