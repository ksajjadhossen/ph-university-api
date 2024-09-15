import { Router } from "express";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
