"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = require("../../error/appError");
const academicDepartment_model_1 = require("../academicDepartmant/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const faculty_model_1 = require("../faculty/faculty.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
// create student into db
const createStudent = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_password;
    userData.role = "student";
    const admissionSemester = yield academicSemester_model_1.AcademicSemesterModel.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error("Admission Semester not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        payload.id = userData.id;
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Transaction failed to create User");
        }
        payload.user = newUser[0]._id;
        const newStudent = yield student_model_1.Student.create([payload]);
        if (!newStudent) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Transaction failed to create Student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
// create faculty
const createFaculty = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.id = "0003";
    userData.password = password || config_1.default.default_password;
    const academicFaculty = yield academicFaculty_model_1.AcademicFaculty.findById(payload.academicFaculty);
    if (!academicFaculty) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Academic Faculty not found.");
    }
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Academic Department not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        payload.id = userData.id;
        const facultyUser = yield user_model_1.User.create([userData], { session });
        if (!facultyUser) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Faculty User not created");
        }
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty) {
            throw new appError_1.AppError(http_status_1.default.BAD_GATEWAY, "Transaction failed to the create Faculty");
        }
        session.commitTransaction();
        session.endSession();
        return newFaculty[0];
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.userServices = {
    createStudent,
    createFaculty,
};
