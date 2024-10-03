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
exports.academicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicFaculty_services_1 = require("./academicFaculty.services");
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield academicFaculty_services_1.academicFacultyServices.createAcademicFaculty(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "create academic faculty is done",
        Success: true,
        data: result,
    });
}));
const findAllAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.academicFacultyServices.getAllAcademicFaculty();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Here is all Academic Faculty",
        data: result,
    });
}));
const findSingleAcademicFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FacultyId } = req.params;
    const result = yield academicFaculty_services_1.academicFacultyServices.getSingleAcademicFacultyById(FacultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "single Academic Faculty Found",
        data: result,
    });
}));
const updateAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { FacultyId } = req.params;
    const result = yield academicFaculty_services_1.academicFacultyServices.updateAcademicFaculty(FacultyId, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Academic Faculty updated",
        data: result,
    });
}));
exports.academicFacultyController = {
    createAcademicFaculty,
    findAllAcademicFaculty,
    findSingleAcademicFacultyById,
    updateAcademicFaculty,
};
