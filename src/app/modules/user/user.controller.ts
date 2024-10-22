import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { userServices } from "./user.services";

const createStudent: RequestHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { password, student } = req.body;
		const result = await userServices.createStudent(password, student);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			Success: true,
			message: "student created successfully",
			data: result,
		});
	}
);

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
	const { faculty, password } = req.body;
	const result = await userServices.createFaculty(password, faculty);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		Success: true,
		message: "Faculty created successfully",
		data: result,
	});
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
	const adminData: TAdmin = req.body;
	const result = await Admin.create(adminData);
	console.log("36 userController", result);
});

export const userController = {
	createStudent,
	createFaculty,
	createAdmin,
};
