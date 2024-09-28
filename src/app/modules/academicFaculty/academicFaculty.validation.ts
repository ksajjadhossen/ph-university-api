import { z } from "zod";

const academicFacultyValidationSchema = z.object({
	body: z.object({
		name: z.string({ invalid_type_error: "academicFaculty must be string" }),
	}),
});
const updateAcademicFacultyValidationSchema = z.object({
	body: z.object({
		name: z.string({ invalid_type_error: "academicFaculty must be string" }),
	}),
});

export const academicFacultyValidation = {
	academicFacultyValidationSchema,
	updateAcademicFacultyValidationSchema,
};
