"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    const errorMassage = err.message || "Something went Wrong";
    return res.status(statusCode).json({
        success: false,
        errorMassage,
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
