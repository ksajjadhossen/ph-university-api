"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRouter = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const router = (0, express_1.Router)();
router.get("/", faculty_controller_1.facultyController.getAllFaculties);
exports.facultyRouter = router;
