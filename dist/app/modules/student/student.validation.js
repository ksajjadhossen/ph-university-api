"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const capitalize = (str) => {
    if (typeof str !== "string" || str.length === 0) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
// Define the Zod schema for IUserName
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ message: "firstName is required" })
        .min(3, "firstName must be more than 3 characters")
        .max(20, "firstName can't be more than 20 characters")
        .transform(capitalize),
    // .refine(isCapitalized, { message: "firstName must be capitalized" })
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().max(20, "lastName can't be more than 20 characters"),
}, { message: "name is required" });
// Define the Zod schema for IGuardian
const guardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
// Define the Zod schema for ILocalGuardian
const localGuardianSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
// Define the Zod schema for IStudent
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            invalid_type_error: "password must be string",
        })
            .min(8, { message: "password must be at least 8 characters" })
            .max(20, { message: "password can not be more than 20 characters" })
            .optional(),
        student: zod_1.z.object({
            name: userNameSchema,
            gender: zod_1.z.enum(["male", "female", "other"]),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string({ message: "email is required" })
                .email({ message: "provide a valid email address" }),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            admissionSemester: zod_1.z.string(),
            profileImage: zod_1.z.string(),
            guardian: guardianSchema,
            localGuardian: localGuardianSchema,
        }),
    }),
});
exports.default = createStudentValidationSchema;
