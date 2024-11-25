import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const createOfferedCourseZodSchema = z.object({
	body: z.object({
		semesterRegistration: z.string({
			required_error: "Semester Registration ID is required.",
		}),
		academicSemester: z
			.string({
				required_error: "Academic Semester ID is required.",
			})
			.optional(),
		academicFaculty: z.string({
			required_error: "Academic Faculty ID is required.",
		}),
		academicDepartment: z.string({
			required_error: "Academic Department ID is required.",
		}),
		course: z.string({ required_error: "Course ID is required." }),
		faculty: z.string({ required_error: "Faculty ID is required." }),
		maxCapacity: z
			.number({ required_error: "Max capacity is required." })
			.default(10),
		section: z.number({ required_error: "Section number is required." }),
		days: z.array(z.enum([...(Days as [string, ...string[]])])),
		startTime: z.string().refine(
			(time) => {
				const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
				return regex.test(time);
			},
			{
				message: "Start time is invalid please edit the time style",
			}
		),
		endTime: z.string().refine(
			(time) => {
				const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
				return regex.test(time);
			},
			{
				message: "End time time is invalid please edit the time style",
			}
		),
	}),
	// .refine(
	// 	({ body }) => {
	// 		const start = new Date(`1970-01-01T${body.startTime}:00`);
	// 		const end = new Date(`1970-01-01T${body.endTime}:00`);
	// 		return end > start;
	// 	},
	// 	{
	// 		message: "Start time should be before end time",
	// 	}
	// ),
});

export const offeredCourseValidationSchema = {
	createOfferedCourseZodSchema,
};
