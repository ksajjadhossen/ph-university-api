import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.services";

const getAllFaculties = catchAsync(async (req, res) => {
	const result = await facultyServices.getAllFaculties();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student found successfully",
		data: result,
	});
});

const getSingleFacultyById = catchAsync(async (req, res) => {
	const { facultyId } = req.params;
	const result = await facultyServices.getSingleFacultyById(facultyId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "faculty found successfully",
		data: result,
	});
});
const deleteFacultyById = catchAsync(async (req, res) => {
	const { facultyId } = req.params;
	const result = await facultyServices.deleteFAcultyById(facultyId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Faculty deleted successfully",
		data: result,
	});
});

const updateFacultyById = catchAsync(async (req, res) => {
	const { facultyId } = req.params;
	const { faculty } = req.body;
	const result = await facultyServices.updateFacultyById(facultyId, faculty);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Faculty Updated successfully",
		data: result,
	});
});

export const facultyController = {
	getAllFaculties,
	getSingleFacultyById,
	deleteFacultyById,
	updateFacultyById,
};
