import { z } from "zod";

const facultyNameSchema = z.object({
	firstName: z.string({ required_error: "First name is required" }).optional(),
	middleName: z.string({ required_error: "Middle name is required" }),
	lastName: z.string({ required_error: "Last name is required" }),
});

const createFacultySchema = z.object({
	body: z.object({
		password: z.string().optional(),
		faculty: z.object({
			id: z.string({ message: "id is string" }).optional(),
			designation: z.string({ message: "designation must be string" }),
			name: facultyNameSchema,
			gender: z.enum(["Male", "Female", "Other"]),
			dateOfBirth: z.string({ message: "Date of birth must be string" }),
			email: z.string().email({ message: "email must be string" }),
			contactNo: z.string({ message: "contact no must be string" }),
			emergencyContactNumber: z.string({
				message: "emergency contact No must be string",
			}),
			presentAddress: z.string({ message: "presentAddress must be string" }),
			permanentAddress: z.string({
				message: "permanent address must be string",
			}),
			profileImage: z
				.string({ message: "profile image must be string" })
				.optional(),
			academicDepartment: z
				.string({ message: "academic department must be string" })
				.optional(),
			status: z.string({ message: "status must be string" }),
			academicFaculty: z.string({ message: "academic FAculty must be string" }),
			isDeleted: z.boolean().default(false),
			createdAt: z.string(),
			updatedAt: z.string(),
		}),
	}),
});

export const facultyValidationSchema = {
	createFacultySchema,
};
