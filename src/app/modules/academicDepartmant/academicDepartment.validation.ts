import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
	body: z.object({
		name: z.string({
			invalid_type_error: "AcademicDepartment is must be string",
			required_error: "AcademicDepartment is required",
		}),
		academicFaculty: z.string({
			invalid_type_error: "AcademicFaculty is must be string",
			required_error: "academicFaculty is required",
		}),
	}),
});
const updateAcademicDepartmentValidationSchema = z.object({
	body: z.object({
		name: z.string({
			invalid_type_error: "AcademicDepartment is must be string",
			required_error: "AcademicDepartment is required",
		}),
		academicFaculty: z.string({
			invalid_type_error: "AcademicFaculty is must be string",
			required_error: "academicFaculty is required",
		}),
	}),
});

export const academicDepartmentValidation = {
	createAcademicDepartmentValidationSchema,
	updateAcademicDepartmentValidationSchema,
};
