"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const router = (0, express_1.Router)();
router.get("/", faculty_controller_1.facultyController.getAllFaculties);
router.get("/:facultyId", faculty_controller_1.facultyController.getSingleFacultyById);
router.delete("/:facultyId", faculty_controller_1.facultyController.deleteFacultyById);
router.patch("/:facultyId", (0, validateRequest_1.default)(faculty_validation_1.facultyValidationSchema.updateFacultySchema), faculty_controller_1.facultyController.updateFacultyById);
exports.facultyRouter = router;
