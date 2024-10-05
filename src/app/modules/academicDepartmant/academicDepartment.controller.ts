import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartment = catchAsync(async (req, res) => {
	console.log(req.body);
	const result = await academicDepartmentServices.createAcademicDepartment(
		req.body
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "AcademicDepartment created successfully",
		data: result,
	});
});

const findAllAcademicDepartment = catchAsync(async (req, res) => {
	const result =
		await academicDepartmentServices.findAllAcademicDepartmentService();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "academic Department found successfully.",
		data: result,
	});
});

const findSingleAcademicDepartmentById = catchAsync(async (req, res) => {
	const { AcademicDepartmentId } = req.params;
	const result =
		await academicDepartmentServices.findSingleAcademicDepartmentById(
			AcademicDepartmentId
		);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Single Academic Department found",
		data: result,
	});
});
const updateSingleAcademicDepartmentById = catchAsync(async (req, res) => {
	const { AcademicDepartmentId } = req.params;
	const data = req.body;
	const result =
		await academicDepartmentServices.updateSingleAcademicDepartmentById(
			AcademicDepartmentId,
			data
		);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: " Academic Department updated",
		data: result,
	});
});

export const academicDepartmentController = {
	createAcademicDepartment,
	findAllAcademicDepartment,
	findSingleAcademicDepartmentById,
	updateSingleAcademicDepartmentById,
};
