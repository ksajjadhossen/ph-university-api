import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentServices } from "./student.service";

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
	const result = await studentServices.getAllStudentsFromDB();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student created successfully",
		data: result,
	});
});

const findStudentById: RequestHandler = catchAsync(async (req, res) => {
	const { studentId } = req.params;
	const result = await studentServices.findStudentFromDB(studentId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student created successfully",
		data: result,
	});
});

export const studentControllers = {
	getAllStudents,
	findStudentById,
};
