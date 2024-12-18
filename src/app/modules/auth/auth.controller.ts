import { RequestHandler } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const logInUser: RequestHandler = catchAsync(async (req, res) => {
	const result = await authServices.loginUser(req.body);
	const { accessToken, refreshToken, needsPasswordChange } = result;
	res.cookie("refreshToken", refreshToken, {
		secure: config.NODE_ENV === "production",
		httpOnly: true,
	});
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		Success: true,
		data: { accessToken, refreshToken, needsPasswordChange },
	});
});
const changePassword: RequestHandler = catchAsync(async (req, res) => {
	const result = await authServices.changePassword(req.user, req.body);
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
