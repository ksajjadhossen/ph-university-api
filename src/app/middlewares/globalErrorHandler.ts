import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import handleZodError from "../interface/handleZodError";
import handleValidationError from "./handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
	let statusCode = err.statusCode || 500;
	let message = err.message || "Something went wrong!";

	let errorSources: TErrorSource = [
		{
			path: "",
			message: "Something went wrong",
		},
	];

	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err);

		(statusCode = simplifiedError?.statusCode),
			(message = simplifiedError?.message),
			(errorSources = simplifiedError?.errors);
	} else if (err?.name === "ValidationError") {
		const simplifiedError = handleValidationError(err);

		(statusCode = simplifiedError?.statusCode),
			(message = simplifiedError?.message),
			(errorSources = simplifiedError?.errors);
	}

	return res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		// stack: config.NODE_ENV === "development" ? err?.stack : null,
	});
};

export default globalErrorHandler;
