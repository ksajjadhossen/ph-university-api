import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import createStudentValidationSchema from "../student/student.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
	"/create-student",
	validateRequest(createStudentValidationSchema),
	userController.createStudent
);

export const userRoute = router;
