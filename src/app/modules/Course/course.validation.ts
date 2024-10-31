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
	}),
});

export const courseValidation = {
	CreateCourseValidationSchema,
};
