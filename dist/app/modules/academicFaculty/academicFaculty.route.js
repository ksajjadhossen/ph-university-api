"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get("/academicFaculties", academicFaculty_controller_1.academicFacultyController.findAllAcademicFaculty);
router.get("/:FacultyId", academicFaculty_controller_1.academicFacultyController.findSingleAcademicFacultyById);
router.patch("/:FacultyId", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.updateAcademicFaculty);
exports.academicFacultyRoute = router;
