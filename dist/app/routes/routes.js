"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/students",
        route: student_route_1.studentRouter,
    },
    {
        path: "/users",
        route: user_route_1.userRoute,
    },
    {
        path: "/academic-semesters",
        route: academicSemester_route_1.academicSemesterRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
