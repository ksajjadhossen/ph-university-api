"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidationSchema = void 0;
const zod_1 = require("zod");
const facultyNameSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First name is required" }).optional(),
    middleName: zod_1.z
        .string({ required_error: "Middle name is required" })
        .optional(),
    lastName: zod_1.z.string({ required_error: "Last name is required" }).optional(),
});
const createFacultySchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            id: zod_1.z.string({ message: "id is string" }).optional(),
            designation: zod_1.z.string({ message: "designation must be string" }),
            name: facultyNameSchema,
            gender: zod_1.z.enum(["Male", "Female", "Other"]),
            dateOfBirth: zod_1.z.string({ message: "Date of birth must be string" }),
            email: zod_1.z.string().email({ message: "email must be string" }),
            contactNo: zod_1.z.string({ message: "contact no must be string" }),
            emergencyContactNumber: zod_1.z.string({
                message: "emergency contact No must be string",
            }),
            presentAddress: zod_1.z.string({ message: "presentAddress must be string" }),
            permanentAddress: zod_1.z.string({
                message: "permanent address must be string",
            }),
            profileImage: zod_1.z
                .string({ message: "profile image must be string" })
                .optional(),
            academicDepartment: zod_1.z
                .string({ message: "academic department must be string" })
                .optional(),
            status: zod_1.z.string({ message: "status must be string" }),
            academicFaculty: zod_1.z.string({ message: "academic FAculty must be string" }),
            isDeleted: zod_1.z.boolean().default(false),
            createdAt: zod_1.z.string(),
            updatedAt: zod_1.z.string(),
        }),
    }),
});
const updateFacultySchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            id: zod_1.z.string({ message: "id is string" }).optional(),
            designation: zod_1.z
                .string({ message: "designation must be string" })
                .optional(),
            name: facultyNameSchema,
            gender: zod_1.z.enum(["Male", "Female", "Other"]).optional(),
            dateOfBirth: zod_1.z
                .string({ message: "Date of birth must be string" })
                .optional(),
            email: zod_1.z.string().email({ message: "email must be string" }).optional(),
            contactNo: zod_1.z.string({ message: "contact no must be string" }).optional(),
            emergencyContactNumber: zod_1.z
                .string({
                message: "emergency contact No must be string",
            })
                .optional(),
            presentAddress: zod_1.z
                .string({ message: "presentAddress must be string" })
                .optional(),
            permanentAddress: zod_1.z
                .string({
                message: "permanent address must be string",
            })
                .optional(),
            profileImage: zod_1.z
                .string({ message: "profile image must be string" })
                .optional(),
            academicDepartment: zod_1.z
                .string({ message: "academic department must be string" })
                .optional(),
            status: zod_1.z.string({ message: "status must be string" }).optional(),
            academicFaculty: zod_1.z
                .string({ message: "academic FAculty must be string" })
                .optional(),
            isDeleted: zod_1.z.boolean().default(false),
            createdAt: zod_1.z.string(),
            updatedAt: zod_1.z.string(),
        }),
    }),
});
exports.facultyValidationSchema = {
    createFacultySchema,
    updateFacultySchema,
};
