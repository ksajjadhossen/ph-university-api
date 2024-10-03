"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User Id is required"],
        unique: true,
        ref: user_model_1.User,
    },
    name: userNameSchema,
    gender: { type: String, enum: ["male", "female", "others"] },
    email: { type: String, required: true },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String },
    admissionSemester: { type: mongoose_1.Schema.Types.ObjectId, ref: "AcademicSemester" },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment",
    },
    avatar: { type: String },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    isDeleted: { type: Boolean, default: false },
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
