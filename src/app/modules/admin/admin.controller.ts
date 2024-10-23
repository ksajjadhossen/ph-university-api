import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";

const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
	const result = await adminServices.getAllAdmins();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admins found successfully",
		data: result,
	});
});
const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
	const { admin } = req.body;
	const { adminId } = req.params;
	const result = await adminServices.updateAdmin(adminId, admin);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Admins Updated successfully",
		data: result,
	});
});

export const adminController = {
	getAllAdmins,
	updateAdmin,
};
