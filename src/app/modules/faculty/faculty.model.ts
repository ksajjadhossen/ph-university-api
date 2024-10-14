import { model, Schema } from "mongoose";
import { TFaculty, TFacultyName } from "./faculty.interface";

export const FacultyNameSchema = new Schema<TFacultyName>({
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
});

export const facultySchema = new Schema<TFaculty>({
	_id: { type: String, required: true },
	id: { type: String },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	role: { type: String, required: true },
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
		ref: "AcademicDepartment",
	},
	status: { type: String, required: true },
	academicFaculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
	isDeleted: { type: Boolean, required: true, default: false },
	createdAt: { type: String, required: true },
	updatedAt: { type: String, required: true },
});

export const Faculty = model<TFaculty>("Faculty", facultySchema);
