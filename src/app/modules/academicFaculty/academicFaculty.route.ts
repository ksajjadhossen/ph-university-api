import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
	"/create-academic-faculty",
	validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
	academicFacultyController.createAcademicFaculty
);

router.get(
	"/academicFaculties",
	academicFacultyController.findAllAcademicFaculty
);
router.get(
	"/:FacultyId",
	academicFacultyController.findSingleAcademicFacultyById
);
router.patch("/:FacultyId", academicFacultyController.updateAcademicFaculty);

export const academicFacultyRoute = router;
