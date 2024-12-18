import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { academicFacultyController } from "./academicFaculty.controller";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
	"/create-academic-faculty",
	Auth(USER_ROLE.admin, USER_ROLE.faculty),
	validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
	academicFacultyController.createAcademicFaculty
);

router.get(
	"/academicFaculties",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicFacultyController.findAllAcademicFaculty
);
router.get(
	"/:FacultyId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicFacultyController.findSingleAcademicFacultyById
);
router.patch(
	"/:FacultyId",
	Auth(USER_ROLE.admin),
	validateRequest(
		academicFacultyValidation.updateAcademicFacultyValidationSchema
	),
	academicFacultyController.updateAcademicFaculty
);

export const academicFacultyRoute = router;
