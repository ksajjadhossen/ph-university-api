import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = 34343;
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});
const findAllOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = 34343;
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});
const findSingleOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = 34343;
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});
const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = 34343;
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});
const deleteOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = 34343;
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});

export const offeredCourseController = {
	createOfferedCourse,
	findAllOfferedCourse,
	findSingleOfferedCourse,
	updateOfferedCourse,
	deleteOfferedCourse,
};
