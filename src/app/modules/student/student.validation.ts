import { z } from "zod";

const capitalize = (str: string) => {
	if (typeof str !== "string" || str.length === 0) {
		return "";
	}
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Define the Zod schema for IUserName
const userNameSchema = z.object(
	{
		firstName: z
			.string({ message: "firstName is required" })
			.min(3, "firstName must be more than 3 characters")
			.max(20, "firstName can't be more than 20 characters")
			.transform(capitalize),
		// .refine(isCapitalized, { message: "firstName must be capitalized" })
		middleName: z.string().optional(),
		lastName: z.string().max(20, "lastName can't be more than 20 characters"),
	},
	{ message: "name is required" }
);

// Define the Zod schema for IGuardian
const guardianSchema = z.object({
	fatherName: z.string(),
	fatherOccupation: z.string(),
	fatherContactNo: z.string(),
	motherName: z.string(),
	motherOccupation: z.string(),
	motherContactNo: z.string(),
});

// Define the Zod schema for ILocalGuardian
const localGuardianSchema = z.object({
	name: z.string(),
	occupation: z.string(),
	contactNo: z.string(),
	address: z.string(),
});

// Define the Zod schema for IStudent
const createStudentValidationSchema = z.object({
	body: z.object({
		password: z
			.string({
				invalid_type_error: "password must be string",
			})
			.min(8, { message: "password must be at least 8 characters" })
			.max(20, { message: "password can not be more than 20 characters" })
			.optional(),
		student: z.object({
			name: userNameSchema,
			gender: z.enum(["male", "female", "other"]),
			dateOfBirth: z.string().optional(),
			email: z
				.string({ message: "email is required" })
				.email({ message: "provide a valid email address" }),
			contactNo: z.string(),
			emergencyContactNo: z.string(),
			bloodGroup: z
				.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
				.optional(),
			presentAddress: z.string(),
			permanentAddress: z.string(),
			admissionSemester: z.string(),
			academicDepartment: z.string(),
			profileImage: z.string(),
			guardian: guardianSchema,
			localGuardian: localGuardianSchema,
		}),
	}),
});
const updateUserNameSchema = z.object(
	{
		firstName: z
			.string({ message: "firstName is required" })
			.min(3, "firstName must be more than 3 characters")
			.max(20, "firstName can't be more than 20 characters")
			.transform(capitalize)
			.optional(),
		// .refine(isCapitalized, { message: "firstName must be capitalized" })
		middleName: z.string().optional(),
		lastName: z
			.string()
			.max(20, "lastName can't be more than 20 characters")
			.optional(),
	},
	{ message: "name is required" }
);

// Define the Zod schema for IGuardian
const updateGuardianSchema = z.object({
	fatherName: z.string().optional(),
	fatherOccupation: z.string().optional(),
	fatherContactNo: z.string().optional(),
	motherName: z.string().optional(),
	motherOccupation: z.string().optional(),
	motherContactNo: z.string().optional(),
});

// Define the Zod schema for ILocalGuardian
const updateLocalGuardianSchema = z.object({
	name: z.string(),
	occupation: z.string().optional(),
	contactNo: z.string().optional(),
	address: z.string().optional(),
});

// Define the Zod schema for IStudent
const updateStudentValidationSchema = z.object({
	body: z.object({
		password: z
			.string({
				invalid_type_error: "password must be string",
			})
			.min(8, { message: "password must be at least 8 characters" })
			.max(20, { message: "password can not be more than 20 characters" })
			.optional(),
		student: z.object({
			name: updateUserNameSchema,
			gender: z.enum(["male", "female", "other"]).optional(),
			dateOfBirth: z.string().optional().optional(),
			email: z
				.string({ message: "email is required" })
				.email({ message: "provide a valid email address" })
				.optional(),
			contactNo: z.string().optional(),
			emergencyContactNo: z.string().optional(),
			bloodGroup: z
				.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
				.optional(),
			presentAddress: z.string().optional(),
			permanentAddress: z.string().optional(),
			admissionSemester: z.string().optional(),
			academicDepartment: z.string().optional(),
			profileImage: z.string().optional(),
			guardian: updateGuardianSchema,
			localGuardian: updateLocalGuardianSchema,
		}),
	}),
});

export const studentValidationSchema = {
	createStudentValidationSchema,
	updateStudentValidationSchema,
};
