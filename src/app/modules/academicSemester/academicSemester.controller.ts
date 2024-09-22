import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.services";

const createAcademicSemester = catchAsync(async (req, res) => {
	const result = await academicSemesterServices.createAcademicSemesterIntoDb(
		req.body
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Academic semester is created Successfully",
		data: result,
	});
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
	const result = await academicSemesterServices.getAllAcademicSemesterFromDB();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Academic semester is created Successfully",
		data: result,
	});
});

const findSingleSemesterById = catchAsync(async (req, res) => {
	const { studentId } = req.params;
	const result = await academicSemesterServices.getSingleStudentById(studentId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Academic Semester found by id",
		data: result,
	});
});

const updateSemesterById = catchAsync(async (req, res) => {
	const data = req.body;
	const { semesterId } = req.params;

	console.log(data);
	const result = await academicSemesterServices.findAcademicSemesterAndUpdate(
		semesterId,
		data
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "data Updated successfully",
		data: result,
	});
});

export const academicSemesterController = {
	createAcademicSemester,
	getAllAcademicSemester,
	findSingleSemesterById,
	updateSemesterById,
};
