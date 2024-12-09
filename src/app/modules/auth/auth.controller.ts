import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const logInUser: RequestHandler = catchAsync(async (req, res) => {
	const result = await authServices.loginUser(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		Success: true,
		data: result,
	});
});
const changePassword: RequestHandler = catchAsync(async (req, res) => {
	const result = await authServices.changePassword(
		req.body,
		req.headers.authorization as string
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Password updated successfully",
		Success: true,
		data: result,
	});
});

export const authController = {
	logInUser,
	changePassword,
};
