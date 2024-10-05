import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "./error";

const handleZodError = (err: ZodError) => {
	const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
		return {
			path: issue.path[issue.path.length - 1],
			message: issue.message,
			errorSources,
		};
	})[];
	const statusCode = 400;
	return {
		statusCode,
		message: "validation error ",
	};
};

export default handleZodError;
