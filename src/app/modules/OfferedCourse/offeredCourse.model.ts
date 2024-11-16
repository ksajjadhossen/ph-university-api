import mongoose, { Schema } from "mongoose";
import { Days } from "./offeredCourse.constant";
import { TOfferedCourse } from "./OfferedCourse.interface";

export const offeredCourseSchema = new Schema<TOfferedCourse>({
	semesterRegistration: {
		type: Schema.Types.ObjectId,
		ref: "SemesterRegistration",
		required: true,
	},
	academicSemester: {
		type: Schema.Types.ObjectId,
		ref: "AcademicSemesterModel",
		required: true,
	},
	academicFaculty: {
		type: Schema.Types.ObjectId,
		ref: "AcademicFaculty",
		required: true,
	},
	academicDepartment: {
		type: Schema.Types.ObjectId,
		ref: "AcademicDepartment",
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: true,
	},
	faculty: { type: Schema.Types.ObjectId, ref: "Faculty", required: true },
	maxCapacity: {
		type: Number,
		default: 10,
	},
	section: { type: Number, required: true },
	days: { type: String, enum: Days },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
});

export const OfferedCourse = mongoose.model<TOfferedCourse>(
	"OfferedCourse",
	offeredCourseSchema
);
