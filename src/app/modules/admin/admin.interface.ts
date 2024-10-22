import { Types } from "mongoose";

export type TAdminName = {
	firstName: string;
	middleName: string;
	lastName: string;
};

export type TAdmin = {
	id: string;
	user: Types.ObjectId;
	needsPasswordChange: boolean;
	designation: boolean;
	role: string;
	name: TAdminName;
	gender: string;
	dateOfBirth: string;
	email: string;
	phoneNumber: string;
	emergencyPhoneNumber: string;
	presentAddress: string;
	permanentAddress: string;
	profileImage: string;
	status: string;
	manageDepartment: Types.ObjectId;
	academicDepartment: Types.ObjectId;
	isDeleted: boolean;
};
