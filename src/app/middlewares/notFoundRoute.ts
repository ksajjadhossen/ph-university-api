import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const notFoundRoute = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorMassage = "Page not found";

	return res.status(httpStatus.NOT_FOUND).json({
		success: false,
		errorMassage,
		error: err,
	});
};

export default notFoundRoute;
