import { object, z } from "zod";

// Zod schema for TAdminName
const adminNameSchema = z.object({
	firstName: z.string().min(1, "First Name is required"),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last Name is required"),
});

// Zod schema for TAdmin
const createAdminValidationSchema = z.object({
	body: z.object({
		password: z.string(),
		admin: object({
			id: z.string().optional(),
			user: z.string().optional(), // Assuming the user is an ObjectId stored as a string
			needsPasswordChange: z.boolean().default(true),
			designation: z.boolean({
				required_error: "designation is required",
			}),
			role: z.string().min(1, "role is required"),
			name: adminNameSchema,
			gender: z.enum(["male", "female", "others"], {
				required_error: "gender is required",
			}),
			dateOfBirth: z.string().min(1, "Date of birth is required"),
			email: z
				.string()
				.email("Invalid email format")
				.min(1, "Email is required"),
			phoneNumber: z.string().min(1, "Phone number is required"),
			emergencyPhoneNumber: z
				.string()
				.min(1, "Emergency phone number is required"),
			presentAddress: z.string().min(1, "Present Address is required"),
			permanentAddress: z.string().min(1, "Permanent Address is required"),
			profileImage: z.string().optional(),
			status: z.string().min(1, "status is required"),
			academicFaculty: z.string().optional(), // Assuming ObjectId stored as a string
			academicDepartment: z.string().optional(), // Assuming ObjectId stored as a string
			isDeleted: z.boolean().default(false),
		}),
	}),
});

const updateAdminNameSchema = z.object({
	firstName: z.string().optional(),
	middleName: z.string().optional().optional(),
	lastName: z.string().optional(),
});
const updateAdminValidationSchema = z.object({
	body: z.object({
		password: z.string().optional(),
		admin: object({
			id: z.string().optional(),
			user: z.string().optional(), // Assuming the user is an ObjectId stored as a string
			needsPasswordChange: z.boolean().default(true).optional(),
			designation: z
				.boolean({
					required_error: "designation is required",
				})
				.optional(),
			role: z.string().optional(),
			name: updateAdminNameSchema,
			gender: z
				.enum(["male", "female", "others"], {
					required_error: "gender is required",
				})
				.optional(),
			dateOfBirth: z.string().optional(),
			email: z.string().email("Invalid email format").optional(),
			phoneNumber: z.string().optional(),
			emergencyPhoneNumber: z.string().optional(),
			presentAddress: z.string().optional(),
			permanentAddress: z.string().optional(),
			profileImage: z.string().optional().optional(),
			status: z.string().optional(),
			academicFaculty: z.string().optional().optional(), // Assuming ObjectId stored as a string
			academicDepartment: z.string().optional().optional(), // Assuming ObjectId stored as a string
			isDeleted: z.boolean().default(false).optional(),
		}),
	}),
});

export const adminValidationSchema = {
	createAdminValidationSchema,
	updateAdminValidationSchema,
};
