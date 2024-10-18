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
exports.facultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const faculty_services_1 = require("./faculty.services");
const getAllFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_services_1.facultyServices.getAllFaculties();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "student found successfully",
        data: result,
    });
}));
const getSingleFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield faculty_services_1.facultyServices.getSingleFacultyById(facultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "faculty found successfully",
        data: result,
    });
}));
const deleteFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield faculty_services_1.facultyServices.deleteFAcultyById(facultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Faculty deleted successfully",
        data: result,
    });
}));
const updateFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const { faculty } = req.body;
    const result = yield faculty_services_1.facultyServices.updateFacultyById(facultyId, faculty);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Faculty Updated successfully",
        data: result,
    });
}));
exports.facultyController = {
    getAllFaculties,
    getSingleFacultyById,
    deleteFacultyById,
    updateFacultyById,
};
