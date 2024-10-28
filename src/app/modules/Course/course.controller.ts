import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourseIntoDb: RequestHandler = catchAsync((req, res) => {
	const data = req.body;
	const result = courseServices.createCourseIntoDb(data);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create academic faculty is done",
		Success: true,
		data: result,
	});
});
const findSingleCourseFromDb: RequestHandler = catchAsync((req, res) => {
	const { id } = req.params;
	const result = courseServices.findSingleCourseFromDb(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create academic faculty is done",
		Success: true,
		data: result,
	});
});
const findCoursesFromDb: RequestHandler = catchAsync((req, res) => {
	const result = courseServices.findCoursesFromDb();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create academic faculty is done",
		Success: true,
		data: result,
	});
});
const deleteCourseFromDb: RequestHandler = catchAsync((req, res) => {
	const data = req.body;
	const result = courseServices.deleteCourseFromDb(data);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create academic faculty is done",
		Success: true,
		data: result,
	});
});

export const courseController = {
	createCourseIntoDb,
	findCoursesFromDb,
	findSingleCourseFromDb,
	deleteCourseFromDb,
};
