import httpStatus from "http-status";
import { AppError } from "../../error/appError";
import { AcademicDepartment } from "../academicDepartmant/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AcademicSemesterModel } from "./../academicSemester/academicSemester.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourse = async (payload: TOfferedCourse) => {
	const semesterRegistration = payload?.semesterRegistration;
	const academicSemester = payload?.academicSemester;
	const academicFaculty = payload?.academicFaculty;
	const academicDepartment = payload?.academicDepartment;
	const course = payload?.course;
	const faculty = payload?.faculty;

	const isSemesterRegistrationExists =
		SemesterRegistration.findById(semesterRegistration);
	if (!isSemesterRegistrationExists) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"semesterRegistration is not exists"
		);
	}
	const isAcademicSemesterExists =
		AcademicSemesterModel.findById(academicSemester);
	if (!isAcademicSemesterExists) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"academicSemester is not exists"
		);
	}
	const isAcademicFacultyExists = AcademicFaculty.findById(academicFaculty);
	if (!isAcademicFacultyExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "academicFaculty is not exists");
	}
	const isAcademicDepartmentExists =
		AcademicDepartment.findById(academicDepartment);
	if (!isAcademicDepartmentExists) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"academicDepartment is not exists"
		);
	}
	const isCourseExists = Course.findById(course);
	if (!isCourseExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "course is not exists");
	}
	const isFacultyExists = Faculty.findById(faculty);
	if (!isFacultyExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "faculty is not exists");
	}

	const result = await OfferedCourse.create(payload);
	return result;
};
const findAllOfferedCourse = async () => {
	const result = await OfferedCourse.find();
	return result;
};
const findSingleOfferedCourse = async (id: string) => {
	const result = await OfferedCourse.findById(id);
	return result;
};
const updateOfferedCourse = async (
	id: string,
	payload: Partial<TOfferedCourse>
) => {
	const result = await OfferedCourse.findByIdAndUpdate(id, payload);
	return result;
};
// const deleteOfferedCourse = async (id: string) => {
// 	const result = await OfferedCourse.findByIdAndUpdate();
// 	return result;
// };

export const offeredCourseService = {
	createOfferedCourse,
	findAllOfferedCourse,
	findSingleOfferedCourse,
	updateOfferedCourse,
	// deleteOfferedCourse,
};
