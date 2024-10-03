"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFoundErrorHandler = void 0;
const notFoundErrorHandler = (_req, _res, next) => {
    const err = new Error("Route not found");
    err.success = false;
    err.status = 404;
    next(err);
};
exports.notFoundErrorHandler = notFoundErrorHandler;
const globalErrorHandler = (error, _req, res, _next) => {
    return res.status(error.status || 500).json({
        success: error.success,
        message: error.message || "something went wrong",
    });
};
exports.globalErrorHandler = globalErrorHandler;
