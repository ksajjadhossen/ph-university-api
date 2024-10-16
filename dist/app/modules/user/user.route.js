"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = require("../faculty/faculty.validation");
const student_validation_1 = require("../student/student.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/create-student", (0, validateRequest_1.default)(student_validation_1.studentValidationSchema.createStudentValidationSchema), user_controller_1.userController.createStudent);
router.post("/create-faculty", (0, validateRequest_1.default)(faculty_validation_1.facultyValidationSchema.createFacultySchema), user_controller_1.userController.createFaculty);
exports.userRoute = router;
