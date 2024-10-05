import { config } from "dotenv";
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Something went wrong!";

	let errorSources: TErrorSource = [
		{
			path: "",
			message: "Something went wrong",
		},
	];

	const handleZodError = (err: ZodError) => {
		const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
			return {
				path: issue.path[issue.path.length - 1],
				message: issue.message,
				errorSources,
			};
		});
		const statusCode = 400;
		return {
			statusCode,
			message: "validation error ",
		};
	};

	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err);

		(statusCode = simplifiedError?.statusCode),
			(message = simplifiedError?.message),
			(errorSources = simplifiedError?.errors);
	}
	return res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		stack: config.NODE_ENV === "development" ? err?.stack : null,
	});
};

export default globalErrorHandler;
