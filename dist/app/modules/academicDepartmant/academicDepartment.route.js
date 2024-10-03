"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post("/create-academic-department", (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get("/allAcademicDepartment", academicDepartment_controller_1.academicDepartmentController.findAllAcademicDepartment);
router.get("/:AcademicDepartmentId", academicDepartment_controller_1.academicDepartmentController.findSingleAcademicDepartmentById);
router.patch("/:AcademicDepartmentId", (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.academicDepartmentController.updateSingleAcademicDepartmentById);
exports.academicDepartmentRoute = router;
