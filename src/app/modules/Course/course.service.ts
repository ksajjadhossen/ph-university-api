import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
	const result = await Course.create(payload);

	return result;
};

const findSingleCourseFromDb = async (id: string) => {
	const result = await Course.findById(id).populate(
		"prerequisiteCourses.courses"
	);
	return result;
};

const findCoursesFromDb = async () => {
	const result = await Course.find().populate("prerequisiteCourses.courses");
	console.log(17, result.toString());
	return result;
};

const updateCourseFromDb = async (id: string, payload: Partial<TCourse>) => {
	const { prerequisiteCourses, ...courseRemainingData } = payload;

	const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
		id,
		courseRemainingData,
		{
			new: true,
			runValidators: true,
		}
	);

	if (prerequisiteCourses && prerequisiteCourses.length > 0) {
		const deletedPreRequisites = prerequisiteCourses
			.filter((el) => el.courses && el.isDeleted)
			.map((el) => el.courses);
		console.log(deletedPreRequisites);
		const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
			$pull: {
				prerequisiteCourses: { course: { $in: deletedPreRequisites } },
			},
		});
	}

	return updatedBasicCourseInfo;
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
	updateCourseFromDb,
	deleteCourseFromDb,
};
