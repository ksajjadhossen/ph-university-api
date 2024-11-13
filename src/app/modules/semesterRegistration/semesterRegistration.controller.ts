import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistrationIntoDb = catchAsync(async (req, res) => {
	const result =
		await semesterRegistrationServices.createSemesterRegistrationIntoDb(
			req.body
		);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student Updated successfully",
		data: result,
	});
});

const getAllSemesterRegistrationIntoDb = catchAsync(async (req, res) => {
	const result =
		await semesterRegistrationServices.getAllSemesterRegistrationIntoDb();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "student Updated successfully",
		data: result,
	});
});
// const getSingleSemesterRegistrationIntoDb = catchAsync(async (req, res) => {
// 	const SemesterRegistrationId = req.params;
// 	const data = req.body;
// 	const result =
// 		await semesterRegistrationServices.getSingleSemesterRegistrationIntoDb(
// 			SemesterRegistrationId
// 		);

// 	sendResponse(res, {
// 		statusCode: httpStatus.OK,
// 		Success: true,
// 		message: "student Updated successfully",
// 		data: result,
// 	});
// });
// const updateSemesterRegistrationIntoDb = catchAsync(async (req, res) => {
// 	const SemesterRegistrationId = req.params;
// 	const data = req.body;
// 	const result =
// 		await semesterRegistrationServices.updateSemesterRegistrationIntoDb(
// 			SemesterRegistrationId,
// 			data
// 		);

// 	sendResponse(res, {
// 		statusCode: httpStatus.OK,
// 		Success: true,
// 		message: "student Updated successfully",
// 		data: result,
// 	});
// });

export const semesterRegistrationController = {
	createSemesterRegistrationIntoDb,
	getAllSemesterRegistrationIntoDb,
	// getSingleSemesterRegistrationIntoDb,
	// updateSemesterRegistrationIntoDb,
};
