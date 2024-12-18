import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { academicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidation } from "./academicDepartment.validation";
const router = express.Router();

router.post(
	"/create-academic-department",
	Auth(USER_ROLE.admin),
	validateRequest(
		academicDepartmentValidation.createAcademicDepartmentValidationSchema
	),
	academicDepartmentController.createAcademicDepartment
);
router.get(
	"/allAcademicDepartment",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicDepartmentController.findAllAcademicDepartment
);
router.get(
	"/:AcademicDepartmentId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	academicDepartmentController.findSingleAcademicDepartmentById
);
router.patch(
	"/:AcademicDepartmentId",
	Auth(USER_ROLE.admin),
	validateRequest(
		academicDepartmentValidation.updateAcademicDepartmentValidationSchema
	),
	academicDepartmentController.updateSingleAcademicDepartmentById
);

export const academicDepartmentRoute = router;
