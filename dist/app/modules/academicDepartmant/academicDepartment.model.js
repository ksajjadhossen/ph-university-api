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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
    },
}, {
    timestamps: true,
});
academicDepartmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDepartmentNameExist = yield exports.AcademicDepartment.findOne({
            name: this.name,
        });
        if (isDepartmentNameExist) {
            throw new Error("this department name is already exists");
        }
        next();
    });
});
academicDepartmentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentIdExist = yield exports.AcademicDepartment.findOne(query);
        if (!isDepartmentIdExist) {
            throw new AppError(404, "Department id is not exist");
        }
        next();
    });
});
exports.AcademicDepartment = (0, mongoose_1.model)("AcademicDepartment", academicDepartmentSchema);
