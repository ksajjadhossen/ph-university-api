import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../error/appError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
	const isUserExists = await User.findOne({ id: payload?.id }).select(
		"+password"
	);

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

const changePassword = async (user: JwtPayload, payload: TChangePassword) => {
	const { userId, role, iat } = user;

	const isUserExist = await User.findOne({ id: userId }).select("+password");
	if (!isUserExist || isUserExist.isDeleted) {
		throw new AppError(httpStatus.NOT_FOUND, "User is not found");
	}
	const isUserBlocked = isUserExist?.status;
	if (isUserBlocked === "blocked") {
		throw new AppError(httpStatus.UNAUTHORIZED, "you are blocked");
	}

	const currentHashedPassword = isUserExist?.password;

	const changedPasswordTime = isUserExist?.passwordChangedAt;
	const exactTime = new Date(changedPasswordTime as Date).getTime() / 1000;

	const passwordChangedAtInSeconds = Math.floor(exactTime);
	if (passwordChangedAtInSeconds > iat!) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"Token expired due to recent password change. Please login again."
		);
	}

	await new Promise<boolean>((resolve, reject) => {
		bcrypt.compare(
			payload.oldPassword,
			currentHashedPassword as string,
			(err, result) => {
				if (err) {
					return reject(err); // Reject if bcrypt fails
				}
				if (!result) {
					return reject(
						new AppError(httpStatus.UNAUTHORIZED, "Password does not match")
					); // Reject with your custom error
				}
				resolve(result); // Resolve true if passwords match
			}
		);
	});

	const newHashedPassword = await bcrypt.hash(
		payload.newPassword,
		config.bcrypt_salt_rounds as number
	);

	await User.findOneAndUpdate(
		{ id: userId }, // Find the user by ID
		{
			password: newHashedPassword,
			needsPasswordChange: false,
			passwordChangedAt: new Date(),
		}
	);

	return null;
};

export const authServices = { loginUser, changePassword };
