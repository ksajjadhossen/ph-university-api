"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Schema for user name
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().min(1),
});
// Schema for guardian details
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
// Schema for local guardian details
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
// Main schema for student details
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(["male", "female", "others"]),
    dateOfBirth: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    contactNo: zod_1.z.string().min(1),
    emergencyContactNo: zod_1.z.string().min(1),
    bloodGroup: zod_1.z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    presentAddress: zod_1.z.string().min(1),
    permanentAddress: zod_1.z.string().min(1),
    profileImage: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(["active", "inActive"]).optional(),
    avatar: zod_1.z.string().optional(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
});
exports.default = studentValidationSchema;
