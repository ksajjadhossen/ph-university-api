import { Types } from "mongoose";

export type TPrerequisiteCourses = {
	courses: Types.ObjectId;
	isDeleted: boolean;
};

export type TCourse = {
	tittle: string;
	prefix: string;
	code: number;
	credits: number;
	prerequisiteCourses: [TPrerequisiteCourses];
	isDeleted: boolean;
};

export type TCourseFacultySchema = {
	course: Types.ObjectId;
	faculties: [Types.ObjectId];
};
