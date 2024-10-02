import { Schema, model } from "mongoose";
import { User } from "../user/user.model";
import {
	IGuardian,
	ILocalGuardian,
	IStudent,
	IUserName,
} from "./student.interface";

const userNameSchema = new Schema<IUserName>({
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
});

const guardianSchema = new Schema<IGuardian>({
	fatherName: { type: String, required: true },
	fatherOccupation: { type: String, required: true },
	fatherContactNo: { type: String, required: true },
	motherName: { type: String, required: true },
	motherOccupation: { type: String, required: true },
	motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
	name: { type: String, required: true },
	occupation: { type: String, required: true },
	contactNo: { type: String, required: true },
	address: { type: String, required: true },
});

const studentSchema = new Schema<IStudent>({
	id: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		required: [true, "User Id is required"],
		unique: true,
		ref: User,
	},
	name: userNameSchema,
	gender: { type: String, enum: ["male", "female", "others"] },
	email: { type: String, required: true },
	dateOfBirth: { type: String },
	contactNo: { type: String, required: true },
	emergencyContactNo: { type: String, required: true },
	bloodGroup: {
		type: String,
		enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
	},
	presentAddress: { type: String, required: true },
	permanentAddress: { type: String, required: true },
	profileImage: { type: String },
	admissionSemester: { type: Schema.Types.ObjectId, ref: "AcademicSemester" },
	academicDepartment: {
		type: Schema.Types.ObjectId,
		ref: "AcademicDepartment",
	},
	avatar: { type: String },
	guardian: guardianSchema,
	localGuardian: localGuardianSchema,
	isDeleted: { type: Boolean, default: false },
});

export const Student = model<IStudent>("Student", studentSchema);
