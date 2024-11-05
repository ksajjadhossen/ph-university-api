import { z } from "zod";

const createPreRequisiteCoursesSchema = z.object({
	courses: z.string(),
	isDeleted: z.boolean().optional(),
});

const CreateCourseValidationSchema = z.object({
	body: z.object({
		tittle: z.string({ required_error: "tittle is required string" }),
		prefix: z.string({ required_error: "prefix is required string" }),
		code: z.number({ required_error: "code is required number" }),
		credits: z.number({ required_error: "credits is required number" }),
		preRequisiteCourses: z.array(createPreRequisiteCoursesSchema).optional(),
		isDeleted: z.boolean().optional(),
	}),
});

const updatePreRequisiteCoursesSchema = z.object({
	courses: z.string().optional(),
	isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
	body: z.object({
		tittle: z
			.string({ required_error: "tittle is required string" })
			.optional(),
		prefix: z
			.string({ required_error: "prefix is required string" })
			.optional(),
		code: z.number({ required_error: "code is required number" }).optional(),
		credits: z
			.number({ required_error: "credits is required number" })
			.optional(),
		preRequisiteCourses: z
			.array(updatePreRequisiteCoursesSchema)
			.optional()
			.optional(),
		isDeleted: z.boolean().optional(),
	}),
});

const facultiesWithCourseValidationSchema = z.object({
	body: z.object({
		faculties: z.array(z.string()),
	}),
});

export const courseValidation = {
	CreateCourseValidationSchema,
	updateCourseValidationSchema,
	facultiesWithCourseValidationSchema,
};
