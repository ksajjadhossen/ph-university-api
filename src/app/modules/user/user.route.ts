import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
	"/create-student",
	validateRequest(studentValidationSchema.createStudentValidationSchema),
	userController.createStudent
);

export const userRoute = router;
