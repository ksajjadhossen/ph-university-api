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
exports.facultyServices = void 0;
const makeFlattenObject_1 = __importDefault(require("../../utils/makeFlattenObject"));
const faculty_model_1 = require("./faculty.model");
const getAllFaculties = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.find();
    return result;
});
const getSingleFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOne({ id });
    return result;
});
const deleteFAcultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOneAndUpdate({ id: id }, { isDeleted: true }, { new: true });
    return result;
});
const updateFacultyById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFlattenData = (0, makeFlattenObject_1.default)(payload);
    const result = faculty_model_1.Faculty.findOneAndUpdate({ id }, updatedFlattenData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.facultyServices = {
    getAllFaculties,
    getSingleFacultyById,
    deleteFAcultyById,
    updateFacultyById,
};
