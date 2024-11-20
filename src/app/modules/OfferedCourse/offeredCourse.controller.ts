import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseService } from "./offeredCourse.service";

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = await offeredCourseService.createOfferedCourse(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Offered Course created successfully",
		data: result,
	});
});
const findAllOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = offeredCourseService.findAllOfferedCourse();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "find all Offered Course successfully",
		data: result,
	});
});
const findSingleOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const result = offeredCourseService.findSingleOfferedCourse(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "find single Offered Course successfully",
		data: result,
	});
});
const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
	const { OfferedCourseId } = req.params;
	const data = req.body;
	const result = await offeredCourseService.updateOfferedCourse(
		OfferedCourseId,
		data
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Offered Course updated successfully",
		data: result,
	});
});
// const deleteOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
// 	const result = 34343;
// 	sendResponse(res, {
// 		statusCode: httpStatus.OK,
// 		Success: true,
// 		message: "Offered Course deleted successfully",
// 		data: result,
// 	});
// });

export const offeredCourseController = {
	createOfferedCourse,
	findAllOfferedCourse,
	findSingleOfferedCourse,
	updateOfferedCourse,
	// deleteOfferedCourse,
};
