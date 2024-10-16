"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const globalErrorhandler = (err, request, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    const handleZodError = (err) => {
        const errorSources = err.issues.map((issue) => {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1];
            message: issue.message;
        });
    };
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
    });
};
exports.default = globalErrorhandler;
