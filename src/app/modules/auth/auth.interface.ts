import { USER_ROLE } from "./auth.constant";

export type TLoginUser = {
	id: string;
	password: string;
};
export type TChangePassword = {
	oldPassword: string;
	newPassword: string;
};

export type TUserRole = keyof typeof USER_ROLE;
