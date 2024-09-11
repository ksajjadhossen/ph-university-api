import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = 500;
	const errorMassage = err.message || "Something went Wrong";

	return res.status(statusCode).json({
		success: false,
		errorMassage,
		error: err,
	});
};
