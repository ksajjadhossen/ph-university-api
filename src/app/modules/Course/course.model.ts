import { model, Schema } from "mongoose";
import {
	TCourse,
	TCourseFacultySchema,
	TPrerequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPrerequisiteCourses>({
	courses: {
		type: Schema.Types.ObjectId,
		ref: "Course",
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

const courseSchema = new Schema<TCourse>({
	tittle: { type: String, unique: true, trim: true, required: true },
	prefix: { type: String, trim: true, required: true },
	code: { type: Number, trim: true, required: true },
	credits: { type: Number, trim: true, required: true },
	prerequisiteCourses: [preRequisiteCoursesSchema],
	isDeleted: { type: Boolean, default: false },
});

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFacultySchema>({
	course: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
	faculties: { type: [Schema.Types.ObjectId], ref: "Faculty" },
});

export const CourseFaculty = model<TCourseFacultySchema>(
	"CourseFaculty",
	courseFacultySchema
);
