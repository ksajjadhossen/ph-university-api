import { Router } from "express";
import { academicDepartmentRoute } from "../modules/academicDepartmant/academicDepartment.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { facultyRouter } from "../modules/faculty/faculty.route";
import { studentRouter } from "../modules/student/student.route";
import { userRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
	{
		path: "/students",
		route: studentRouter,
	},
	{
		path: "/users",
		route: userRoute,
	},
	{
		path: "/academic-semesters",
		route: academicSemesterRouter,
	},
	{
		path: "/academic-faculty",
		route: academicFacultyRoute,
	},
	{
		path: "/academic-department",
		route: academicDepartmentRoute,
	},
	{
		path: "/faculty",
		route: facultyRouter,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
