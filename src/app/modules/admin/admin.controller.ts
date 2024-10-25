import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";

const getAllAdminsFromDb: RequestHandler = catchAsync(async (req, res) => {
	const result = await adminServices.getAllAdminsFromDb();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admins found successfully",
		data: result,
	});
});
const updateAdminFromDb: RequestHandler = catchAsync(async (req, res) => {
	const { admin } = req.body;
	const { adminId } = req.params;
	const result = await adminServices.updateAdminFromDb(adminId, admin);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admins Updated successfully",
		data: result,
	});
});
const deleteAdminFromDb: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await adminServices.deleteAdminFromDb(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admin deleted successfully",
		data: result,
	});
});

export const adminController = {
	getAllAdminsFromDb,
	updateAdminFromDb,
	deleteAdminFromDb,
};
