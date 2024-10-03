"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "AcademicDepartment is must be string",
            required_error: "AcademicDepartment is required",
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "AcademicFaculty is must be string",
            required_error: "academicFaculty is required",
        }),
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "AcademicDepartment is must be string",
            required_error: "AcademicDepartment is required",
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "AcademicFaculty is must be string",
            required_error: "academicFaculty is required",
        }),
    }),
});
exports.academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
