"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyServices = void 0;
const faculty_model_1 = require("./faculty.model");
const getAllFaculties = () => {
    const result = faculty_model_1.Faculty.find();
    return result;
};
exports.facultyServices = {
    getAllFaculties,
};
