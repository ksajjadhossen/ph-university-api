import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import { AppError } from "../error/appError";
import { TUserRole } from "../modules/auth/auth.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "./../../../node_modules/@types/jsonwebtoken/index.d";

const Auth = (...RequiredRole: TUserRole[]) => {
	return catchAsync((req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorize.");
		}

		jwt.verify(
			token,
			config.jwt_secret_token as string,
			async function (err, decoded) {
				const { userId, role, iat } = decoded as JwtPayload;
				const isUserIdExists = await User.findOne({ id: userId });

				if (!isUserIdExists) {
					throw new AppError(httpStatus.NOT_FOUND, "User not found");
				}

				if (err) {
					throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
				}

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
