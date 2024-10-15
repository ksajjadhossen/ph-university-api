import { Types } from "mongoose";

export type TFacultyName = {
	firstName: string;
	middleName: string;
	lastName: string;
};

export type TFaculty = {
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
