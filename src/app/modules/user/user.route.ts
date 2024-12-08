import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "../admin/admin.validation";
import { USER_ROLE } from "../auth/auth.constant";
import { facultyValidationSchema } from "../faculty/faculty.validation";
import { studentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
	"/create-student",
	Auth(USER_ROLE.admin),
	validateRequest(studentValidationSchema.createStudentValidationSchema),
	userController.createStudent
);
router.post(
	"/create-faculty",
	validateRequest(facultyValidationSchema.createFacultySchema),
	userController.createFaculty
);
router.post(
	"/create-admin",
	validateRequest(adminValidationSchema.createAdminValidationSchema),
	userController.createAdmin
);

export const userRoute = router;
