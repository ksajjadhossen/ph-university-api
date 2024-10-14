import { Types } from "mongoose";

export type TFacultyName = {
	firstName: string;
	middleName: string;
	lastName: string;
};

export type TFaculty = {
	password: string;
	faculty: {
		_id: string;
		id?: string;
		user: Types.ObjectId;
		role: string;
		designation: string;
		name: TFacultyName;
		gender: string;
		dateOfBirth: string;
		email: string;
		contactNo: string;
		emergencyContactNumber: string;
		presentAddress: string;
		permanentAddress: string;
		profileImage?: string;
		academicDepartment: Types.ObjectId;
		status: string;
		academicFaculty: Types.ObjectId;
		isDeleted: boolean;
		createdAt: string;
		updatedAt: string;
	};
};
export type TFacultyUser = {
	user: import("mongoose").Types.ObjectId;
	id: string;
	password: string;
	needsPasswordChange: boolean;
	role: "student" | "faculty" | "admin";
	isDeleted: boolean;
};
