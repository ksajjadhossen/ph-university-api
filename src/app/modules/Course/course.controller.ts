import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourseIntoDb: RequestHandler = catchAsync(async (req, res) => {
	const data = req.body;
	console.log("controller", data);
	const result = await courseServices.createCourseIntoDb(data);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create course is done",
		Success: true,
		data: result,
	});
});
const findSingleCourseFromDb: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await courseServices.findSingleCourseFromDb(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "find  single course is done",
		Success: true,
		data: result,
	});
});
const findCoursesFromDb: RequestHandler = catchAsync(async (req, res) => {
	const result = await courseServices.findCoursesFromDb();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "find all courses is done",
		Success: true,
		data: result,
	});
});
const deleteCourseFromDb: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await courseServices.deleteCourseFromDb(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "course is deleted",
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
