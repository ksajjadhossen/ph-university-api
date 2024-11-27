import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourseIntoDb: RequestHandler = catchAsync(async (req, res) => {
	const data = req.body;
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
const updateCourseToDb: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const result = await courseServices.updateCourseFromDb(id, data);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "course is Updated",
		Success: true,
		data: result,
	});
});

const assignFacultiesIntoDB: RequestHandler = catchAsync(async (req, res) => {
	const { courseId } = req.params;
	const { faculties } = req.body;
	const result = await courseServices.assignFacultiesIntoDB(
		courseId,
		faculties
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "faculty assigned successfully.",
		Success: true,
		data: result,
	});
});

const deleteFacultiesFromDB: RequestHandler = catchAsync(async (req, res) => {
	const { courseId } = req.params;
	const { faculties } = req.body;
	const result = await courseServices.deleteFacultiesFromDB(
		courseId,
		faculties
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "faculty deleted successfully.",
		Success: true,
		data: result,
	});
});

export const courseController = {
	createCourseIntoDb,
	findCoursesFromDb,
	findSingleCourseFromDb,
	updateCourseToDb,
	deleteCourseFromDb,
	assignFacultiesIntoDB,
	deleteFacultiesFromDB,
};
