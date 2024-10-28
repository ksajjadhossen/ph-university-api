import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = (payload: TCourse) => {
	const result = Course.create(payload);
	return result;
};

const findSingleCourseFromDb = (id: string) => {
	const result = Course.findById(id);
	return result;
};

const findCoursesFromDb = () => {
	const result = Course.find();
	return result;
};

const deleteCourseFromDb = (id: string) => {
	const result = Course.findByIdAndUpdate(
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
