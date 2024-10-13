import { z } from "zod";

const facultyNameSchema = z.object({
	firstName: z.string({ required_error: "First name is required" }),
	middleName: z.string({ required_error: "Middle name is required" }),
	lastName: z.string({ required_error: "Last name is required" }),
});

const createFacultySchema = z.object({
	_id: z.string(),
	password: z.string(),
	id: z.string().optional(), // Optional field
	user: z.string().optional(), // Assuming it's an ObjectId (as a string)
	role: z.string(),
	designation: z.string(),
	name: facultyNameSchema, // Nested object for name validation
	gender: z.enum(["Male", "Female", "Other"]), // Enum for gender
	dateOfBirth: z.string(), // Date of birth as string
	email: z.string().email(), // Validates email format
	contactNo: z.string(),
	emergencyContactNumber: z.string(),
	presentAddress: z.string(),
	permanentAddress: z.string(),
	profileImage: z.string().optional(), // Optional URL validation
	academicDepartment: z.string().optional(), // Optional ObjectId (string)
	status: z.string(),
	academicFaculty: z.string(), // ObjectId as a string
	isDeleted: z.boolean().default(false), // Boolean with default value
	createdAt: z.string(), // Creation date as string
	updatedAt: z.string(), // Update date as string
});

export const facultyValidationSchema = {
	createFacultySchema,
};
