import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterController } from "./academicSemester.controller";
import { academicSemesterValidation } from "./academicSemester.validation";
const router = express.Router();

router.post(
	"/create-academic-semester",
	validateRequest(
		academicSemesterValidation.createAcademicSemesterValidationSchema
	),
	academicSemesterController.createAcademicSemester
);

router.get("/", academicSemesterController.getAllAcademicSemester);
router.get("/:semesterId", academicSemesterController.findSingleSemesterById);
router.patch(
	"/:semesterId",
	validateRequest(
		academicSemesterValidation.createAcademicSemesterValidationSchema
	),
	academicSemesterController.updateSemesterById
);

export const academicSemesterRouter = router;
