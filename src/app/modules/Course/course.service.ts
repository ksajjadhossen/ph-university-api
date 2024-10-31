import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
	const result = await Course.create(payload);

	return result;
};

const findSingleCourseFromDb = async (id: string) => {
	const result = await Course.findById(id);
	return result;
};

const findCoursesFromDb = async () => {
	const result = await Course.find();
	return result;
};

const deleteCourseFromDb = async (id: string) => {
	const result = await Course.findByIdAndUpdate(
		id,
		{ isDeleted: true },
		{ new: true }
	);
	return result;
};

export const courseServices = {
	createCourseIntoDb,
	findSingleCourseFromDb,
	findCoursesFromDb,
	deleteCourseFromDb,
};
