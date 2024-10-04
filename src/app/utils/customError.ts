import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";

const globalErrorhandler: ErrorRequestHandler = (err, request, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Something went wrong";

	type TErrorSource = {
		path: string | number;
		message: string;
	};

	let errorSources: TErrorSource = [
		{
			path: "",
			message: "Something went wrong",
		},
	];

	const handleZodError = (err: ZodError) => {
		const errorSources = err.issues.map((issue: ZodIssue) => {
			path: issue?.path[issue.path.length - 1];
			message: issue.message;
		});
	};

	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorSources = simplifiedError?.errorSources;
	}

	return res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		error: err,
	});
};

export default globalErrorhandler;
