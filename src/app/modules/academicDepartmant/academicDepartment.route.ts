import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidation } from "./academicDepartment.validation";
const router = express.Router();

router.post(
	"/create-academic-department",
	validateRequest(
		academicDepartmentValidation.createAcademicDepartmentValidationSchema
	),
	academicDepartmentController.createAcademicDepartment
);
router.get(
	"/allAcademicDepartment",
	academicDepartmentController.findAllAcademicDepartment
);
router.get(
	"/:AcademicDepartmentId",
	academicDepartmentController.findSingleAcademicDepartmentById
);
router.patch(
	"/:AcademicDepartmentId",
	validateRequest(
		academicDepartmentValidation.updateAcademicDepartmentValidationSchema
	),
	academicDepartmentController.updateSingleAcademicDepartmentById
);

export const academicDepartmentRoute = router;
