import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.services";

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
	const data = req.body;
	const result = await academicFacultyServices.createAcademicFaculty(data);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "create academic faculty is done",
		Success: true,
		data: result,
	});
});
const findAllAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
	const result = await academicFacultyServices.getAllAcademicFaculty();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Here is all Academic Faculty",
		data: result,
	});
});

const findSingleAcademicFacultyById: RequestHandler = catchAsync(
	async (req, res) => {
		const { FacultyId } = req.params;
		const result = await academicFacultyServices.getSingleAcademicFacultyById(
			FacultyId
		);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			Success: true,
			message: "single Academic Faculty Found",
			data: result,
		});
	}
);

const updateAcademicFaculty = catchAsync(async (req, res) => {
	const data = req.body;
	const { FacultyId } = req.params;
	const result = await academicFacultyServices.updateAcademicFaculty(
		FacultyId,
		data
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Academic Faculty updated",
		data: result,
	});
});

export const academicFacultyController = {
	createAcademicFaculty,
	findAllAcademicFaculty,
	findSingleAcademicFacultyById,
	updateAcademicFaculty,
};
