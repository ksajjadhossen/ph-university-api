import { z } from "zod";

// Define the username schema using Zod
const usernameSchema = z.object({
	firstName: z.string({ required_error: "First name is required" }),
	middleName: z.string({ required_error: "Middle name is required" }),
	lastName: z.string({ required_error: "Last name is required" }),
});

// Define the faculty schema using Zod
const createFacultySchema = z.object({
	body: z.object({
		id: z.string({ required_error: "ID is required" }),
		designation: z.string({ required_error: "Designation is required" }),
		name: usernameSchema,
		gender: z.string({ required_error: "Gender is required" }),
		dateOfBirth: z.string({ required_error: "Date of birth is required" }),
		email: z.string({ required_error: "Email is required" }),
		phoneNumber: z.string({ required_error: "Phone number is required" }),
		emergencyContactNumber: z.string({
			required_error: "Emergency contact number is required",
		}),
		presentAddress: z.string({ required_error: "Present address is required" }),
		permanentAddress: z.string({
			required_error: "Permanent address is required",
		}),
		profileImage: z.string({ required_error: "Profile image is required" }),
		status: z.string({ required_error: "Status is required" }),
		academicDepartment: z.string({
			required_error: "Academic department is required",
		}),
		academicFaculty: z.string({
			required_error: "Academic faculty is required",
		}),
		isDeleted: z.boolean({ required_error: "IsDeleted field is required" }),
		createdAt: z.string({ required_error: "Created date is required" }),
		updatedAt: z.string({ required_error: "Updated date is required" }),
	}),
});

export const facultyValidationSchema = {
	createFacultySchema,
};
