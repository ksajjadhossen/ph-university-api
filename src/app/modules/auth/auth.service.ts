import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
	const isUserExists = await User.findOne({ id: payload?.id });

	if (!isUserExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "User is not exists");
	}
	const isUserDeletedExists = isUserExists?.isDeleted;

	if (isUserDeletedExists === true) {
		throw new AppError(httpStatus.BAD_REQUEST, "User is already deleted");
	}
	const isUserBlocked = isUserExists?.status;

	if (isUserBlocked === "blocked") {
		throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
	}

	const isPasswordMatched = await bcrypt.compare(
		payload?.password,
		isUserExists?.password
	);

	if (!isPasswordMatched) {
		throw new AppError(httpStatus.BAD_REQUEST, "password does not matched");
	}

	const jwtPayload = {
		userId: isUserExists?.id,
		role: isUserExists?.role,
	};

	const accessToken = jwt.sign(jwtPayload, config.jwt_secret_token as string, {
		expiresIn: "10d",
	});

	return {
		accessToken,
		needsPasswordChange: isUserExists?.needsPasswordChange,
	};
};

export const authServices = { loginUser };
