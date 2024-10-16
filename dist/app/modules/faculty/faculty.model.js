"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.facultySchema = void 0;
const mongoose_1 = require("mongoose");
const FacultyNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
exports.facultySchema = new mongoose_1.Schema({
    id: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, default: "faculty" },
    designation: { type: String, required: true },
    name: { type: FacultyNameSchema, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment",
    },
    status: { type: String, required: true },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});
exports.Faculty = (0, mongoose_1.model)("Faculty", exports.facultySchema);
