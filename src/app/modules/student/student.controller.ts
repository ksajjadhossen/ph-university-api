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
		message: "student found successfully",
		data: result,
	});
});

const updateStudentIntoDB: RequestHandler = catchAsync(async (req, res) => {
	const { studentId } = req.params;
	const result = await studentServices.updateStudentIntoDB(
		studentId,
		req.body.student
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student Updated successfully",
		data: result,
	});
});

const deleteStudentById: RequestHandler = catchAsync(async (req, res) => {
	const { studentId } = req.params;
	const result = await studentServices.deleteStudentFromDB(studentId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student deleted successfully",
		data: result,
	});
});

export const studentControllers = {
	getAllStudents,
	findStudentById,
	deleteStudentById,
	updateStudentIntoDB,
};
