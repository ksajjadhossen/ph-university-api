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
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student } = req.body;
        const zodParsedData = student_validation_1.default.parse(student);
        const response = yield student_service_1.studentServices.createStudentIntoDB(student);
        res.status(200).json({
            success: true,
            message: "created successfully",
            data: response,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "created retried successfully.",
            data: result,
        });
    }
    catch (error) { }
});
const findStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.studentServices.findStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "student retried successfully",
        data: result,
    });
    try {
    }
    catch (error) {
        console.log(error);
    }
});
exports.studentControllers = {
    createStudent,
    getAllStudents,
    findStudentById,
};
