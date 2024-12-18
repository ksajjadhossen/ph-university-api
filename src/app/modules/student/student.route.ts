import express from "express";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.get(
	"/",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	studentControllers.getAllStudents
);
router.get(
	"/:studentId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	studentControllers.findStudentById
);
router.patch(
	"/:studentId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	studentControllers.updateStudentIntoDB
);
router.delete(
	"/:studentId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	studentControllers.deleteStudentById
);

export const studentRouter = router;
