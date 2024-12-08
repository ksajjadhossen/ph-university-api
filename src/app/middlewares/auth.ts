import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import { AppError } from "../error/appError";
import { TUserRole } from "../modules/auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "./../../../node_modules/@types/jsonwebtoken/index.d";

const Auth = (...RequiredRole: TUserRole[]) => {
	return catchAsync((req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization;
		if (!token) {
			throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorize.");
		}

		jwt.verify(
			token,
			config.jwt_secret_token as string,
			function (err, decoded) {
				if (err) {
					throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
				}
				const role = (decoded as JwtPayload)?.role;
				if (RequiredRole && !RequiredRole.includes(role)) {
					throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
				}
				req.user = decoded as JwtPayload;

				next();
			}
		);
	});
};

export default Auth;
