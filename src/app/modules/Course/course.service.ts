import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/appError";
import { TCourse, TCourseFacultySchema } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";

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

	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
			id,
			courseRemainingData,
			{
				new: true,
				runValidators: true,
				session,
			}
		);

		if (prerequisiteCourses && prerequisiteCourses.length > 0) {
			const deletedPreRequisites = prerequisiteCourses
				.filter((el) => el.courses && el.isDeleted)
				.map((el) => el.courses);
			const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
				id,
				{
					$pull: {
						prerequisiteCourses: { course: { $in: deletedPreRequisites } },
					},
				},
				{
					new: true,
					runValidators: true,
					session,
				}
			);
			if (!deletedPreRequisiteCourses) {
				throw new AppError(
					httpStatus.BAD_REQUEST,
					" can not deletedPreRequisiteCourses"
				);
			}
			const newPreRequisites = prerequisiteCourses.filter(
				(el) => el.courses && !el.isDeleted
			);
			const newPreRequisiteCourses = await Course.findByIdAndUpdate(
				id,
				{
					$addToSet: { prerequisiteCourses: { $each: newPreRequisites } },
				},
				{
					new: true,
					runValidators: true,
					session,
				}
			);
			if (!newPreRequisiteCourses) {
				throw new AppError(
					httpStatus.BAD_REQUEST,
					" can not newPreRequisiteCourses"
				);
			}
		}

		const result = await Course.findById(id).populate(
			"prerequisiteCourses.courses"
		);

		await session.commitTransaction();
		await session.endSession();
		return result;
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw new AppError(httpStatus.BAD_REQUEST, "failed to update course");
	}
};
const deleteCourseFromDb = async (id: string) => {
	const result = await Course.findByIdAndUpdate(
		id,
		{ isDeleted: true },
		{ new: true }
	);
	return result;
};

const assignFacultiesIntoDB = async (
	id: string,
	payload: Partial<TCourseFacultySchema>
) => {
	const result = await CourseFaculty.findByIdAndUpdate(
		id,
		{
			$addToSet: { faculties: { $each: payload } },
		},
		{
			upsert: true,
			new: true,
		}
	);
	return result;
};

export const courseServices = {
	createCourseIntoDb,
	findSingleCourseFromDb,
	findCoursesFromDb,
	updateCourseFromDb,
	deleteCourseFromDb,
	assignFacultiesIntoDB,
};
