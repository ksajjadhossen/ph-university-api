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
const appError_1 = require("../../error/appError");
const makeFlattenObject_1 = __importDefault(require("../../utils/makeFlattenObject"));
const user_model_1 = require("../user/user.model");
const student_model_1 = require("./student.model");
const createStudentIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.create(student);
    return result;
});
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
    let searchTerm = "";
    const queryObject = Object.assign({}, query);
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchQuery = student_model_1.Student.find({
        $or: studentSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    const excludeFields = ["searchTerm", "sort", "page", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObject[el]);
    const filterQuery = searchQuery
        .find(queryObject)
        .populate("user")
        .populate("academicDepartment")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    let sort = "-createdAt";
    if (query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 10;
    let skip = 0;
    if (query.limit) {
        limit = Number(query.limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = query.page;
        skip = page - 1 * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    let fields = "-__v";
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = query.fields.split(",").join(" ");
    }
    const fieldQuery = yield limitQuery.select(fields);
    return fieldQuery;
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
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to delete user");
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
exports.studentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    findStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB,
};
