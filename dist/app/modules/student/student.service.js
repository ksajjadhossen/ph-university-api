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
exports.studentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const makeFlattenObject_1 = __importDefault(require("../../utils/makeFlattenObject"));
const user_model_1 = require("../user/user.model");
const student_model_1 = require("./student.model");
const createStudentIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.create(student);
    return result;
});
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find()
        .populate("user")
        .populate("academicDepartment")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    return result;
});
const findStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id);
    return result;
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFlattenData = (0, makeFlattenObject_1.default)(payload);
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, updatedFlattenData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error("failed to delete student");
    }
});
// const deleteStudentFromDB = async (id: string) => {
// 	const deletedStudent = await Student.findOneAndUpdate(
// 		{ id },
// 		{ isDeleted: true },
// 		{ new: true }
// 	);
// 	return deletedStudent;
// };
exports.studentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    findStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB,
};
