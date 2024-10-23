import { model, Schema } from "mongoose";
import { TAdmin, TAdminName } from "./admin.interface";

const adminNameSchema = new Schema<TAdminName>({
	firstName: { type: String, required: [true, "First Name is required"] },
	middleName: String,
	lastName: { type: String, required: [true, "Last Name is required"] },
});

const adminSchema = new Schema<TAdmin>({
	id: { type: String },
	user: Schema.Types.ObjectId,
	needsPasswordChange: {
		type: Boolean,
		default: true,
	},
	designation: {
		type: Boolean,
		required: [true, "designation is required"],
	},
	role: { type: String, required: [true, "role is required"] },
	name: adminNameSchema,
	gender: {
		type: String,
		enum: ["male", "female", "others"],
		required: [true, "gender is required"],
	},
	dateOfBirth: {
		type: String,
		required: [true, "Date of birth is required"],
	},
	email: { type: String, required: [true, "Email is required"] },
	phoneNumber: {
		type: String,
		required: [true, "Phone number is required"],
	},
	emergencyPhoneNumber: {
		type: String,
		required: [true, "Emergency phone number is required"],
	},
	presentAddress: {
		type: String,
		required: [true, "Present Address is required"],
	},
	permanentAddress: {
		type: String,
		required: [true, "Permanent Address is required"],
	},
	profileImage: { type: String },
	status: { type: String, required: [true, "status is required"] },
	academicFaculty: Schema.ObjectId,
	academicDepartment: Schema.ObjectId,
	isDeleted: { type: Boolean, default: false },
});

export const Admin = model<TAdmin>("Admin", adminSchema);
