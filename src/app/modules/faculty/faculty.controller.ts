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

export const facultyController = {
	getAllFaculties,
};
