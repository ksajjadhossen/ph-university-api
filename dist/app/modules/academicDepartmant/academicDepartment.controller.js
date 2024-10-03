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
exports.academicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicDepartment_services_1 = require("./academicDepartment.services");
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.createAcademicDepartment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "AcademicDepartment created successfully",
        data: result,
    });
}));
const findAllAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.findAllAcademicDepartmentService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "academic Department found successfully.",
        data: result,
    });
}));
const findSingleAcademicDepartmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { AcademicDepartmentId } = req.params;
    const result = yield academicDepartment_services_1.academicDepartmentServices.findSingleAcademicDepartmentById(AcademicDepartmentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: "Single Academic Department found",
        data: result,
    });
}));
const updateSingleAcademicDepartmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { AcademicDepartmentId } = req.params;
    const data = req.body;
    const result = yield academicDepartment_services_1.academicDepartmentServices.updateSingleAcademicDepartmentById(AcademicDepartmentId, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        Success: true,
        message: " Academic Department updated",
        data: result,
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartment,
    findAllAcademicDepartment,
    findSingleAcademicDepartmentById,
    updateSingleAcademicDepartmentById,
};
