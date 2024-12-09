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

const changePassword = async (payload: TChangePassword, token: string) => {
	jwt.verify(
		token,
		config.jwt_secret_token as string,
		async function (err, decoded) {
			const currentUserId = (decoded as JwtPayload).userId;
			const isUserExists = await User.findOne({ id: currentUserId }).select(
				"+password"
			);
			console.log(isUserExists);
			if (!isUserExists) {
				throw new AppError(httpStatus.NOT_FOUND, "User is not found");
			}

			const currentHashedPassword = isUserExists?.password;
			bcrypt.compare(
				payload.oldPassword,
				currentHashedPassword as string,
				async function (err, result) {
					if (result === true) {
						console.log("new password", payload.newPassword);
						bcrypt.hash(
							payload.newPassword,
							config.bcrypt_salt_rounds as number,
							async function (err, hash) {
								await User.findOneAndUpdate({
									password: hash,
									needsPasswordChange: false,
									passwordChangedAt: new Date(),
								});
								return null;
							}
						);
					}
				}
			);
		}
	);
};

export const authServices = { loginUser, changePassword };
