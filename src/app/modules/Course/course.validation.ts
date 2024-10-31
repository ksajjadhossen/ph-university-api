import { z } from "zod";

const createPreRequisiteCoursesSchema = z.object({
	courses: z.string(),
	isDeleted: z.boolean().optional(),
});

const CreateCourseValidationSchema = z.object({
	body: z.object({
		tittle: z.string(),
		prefix: z.string(),
		course: z.number(),
		credits: z.number(),
		preRequisiteCourses: z.array(createPreRequisiteCoursesSchema),
	}),
});

export const courseValidation = {
	CreateCourseValidationSchema,
};
