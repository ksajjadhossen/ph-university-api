import { model, Schema } from "mongoose";
import { TFaculty, TFacultyName } from "./faculty.interface";

export const usernameSchema = new Schema<TFacultyName>({
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

export const facultySchema = new Schema<TFaculty>(
	{
		_id: { type: String, required: true },
		id: { type: String, required: true },
		designation: { type: String, required: true },
		name: usernameSchema,
		gender: { type: String, required: true },
		dateOfBirth: { type: String, required: true },
		email: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		emergencyContactNumber: { type: String, required: true },
		presentAddress: { type: String, required: true },
		permanentAddress: { type: String, required: true },
		profileImage: { type: String, required: true },
		status: { type: String, required: true },
		academicDepartment: { type: String, required: true },
		academicFaculty: { type: String, required: true },
		isDeleted: { type: Boolean, required: true },
		createdAt: { type: String, required: true },
		updatedAt: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export const Faculty = model<TFaculty>("Faculty", facultySchema);
