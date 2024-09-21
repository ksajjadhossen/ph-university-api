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
exports.academicSemesterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicSemester_services_1 = require("./academicSemester.services");
const createAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.createAcademicSemesterIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Academic semester is created Successfully",
        data: result,
    });
}));
const getAllAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.getAllAcademicSemesterFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Academic semester is created Successfully",
        data: result,
    });
}));
const findSingleSemesterById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield academicSemester_services_1.academicSemesterServices.getSingleStudentById(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Academic Semester found by id",
        data: result,
    });
}));
exports.academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    findSingleSemesterById,
};
