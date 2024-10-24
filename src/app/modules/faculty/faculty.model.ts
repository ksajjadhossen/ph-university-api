import { model, Schema } from "mongoose";
import { TFaculty, TFacultyName } from "./faculty.interface";

const FacultyNameSchema = new Schema<TFacultyName>({
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
	},
	lastName: {
		type: String,
		required: true,
	},
});

export const facultySchema = new Schema<TFaculty>({
	id: { type: String },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	role: { type: String, default: "faculty" },
	designation: { type: String, required: true },
	name: { type: FacultyNameSchema, required: true },
	gender: { type: String, required: true },
	dateOfBirth: { type: String, required: true },
	email: { type: String, required: true },
	contactNo: { type: String, required: true },
	emergencyContactNumber: { type: String, required: true },
	presentAddress: { type: String, required: true },
	permanentAddress: { type: String, required: true },
	profileImage: { type: String },
	academicDepartment: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	status: { type: String, required: true },
	academicFaculty: {
		type: Schema.Types.ObjectId,
		ref: "AcademicFaculty",
		required: true,
	},
	isDeleted: { type: Boolean, required: true, default: false },
	createdAt: { type: String, required: true },
	updatedAt: { type: String, required: true },
});

export const Faculty = model<TFaculty>("Faculty", facultySchema);
