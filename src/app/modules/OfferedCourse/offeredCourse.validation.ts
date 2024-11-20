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
		startTime: z.string({ required_error: "Start time is required." }),
		endTime: z.string({ required_error: "End time is required." }),
	}),
});

export const offeredCourseValidationSchema = {
	createOfferedCourseZodSchema,
};
