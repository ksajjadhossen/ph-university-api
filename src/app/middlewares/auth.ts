import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import { AppError } from "../error/appError";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "./../../../node_modules/@types/jsonwebtoken/index.d";

const auth = () => {
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
				req.user = decoded as JwtPayload;

				next();
			}
		);
	});
};

export default auth;
