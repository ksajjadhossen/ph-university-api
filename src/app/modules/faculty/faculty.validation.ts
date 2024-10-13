import { z } from "zod";

const facultyNameSchema = z.object({
	firstName: z.string({ required_error: "First name is required" }),
	middleName: z.string({ required_error: "Middle name is required" }),
	lastName: z.string({ required_error: "Last name is required" }),
});

const createFacultySchema = z.object({
	_id: z.string(),
	password: z.string(),
	id: z.string().optional(),
	user: z.string().optional(),
	role: z.string(),
	designation: z.string(),
	name: facultyNameSchema,
	gender: z.enum(["Male", "Female", "Other"]),
	dateOfBirth: z.string(),
	email: z.string().email(),
	contactNo: z.string(),
	emergencyContactNumber: z.string(),
	presentAddress: z.string(),
	permanentAddress: z.string(),
	profileImage: z.string().optional(),
	academicDepartment: z.string().optional(),
	status: z.string(),
	academicFaculty: z.string(),
	isDeleted: z.boolean().default(false),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const facultyValidationSchema = {
	createFacultySchema,
};
