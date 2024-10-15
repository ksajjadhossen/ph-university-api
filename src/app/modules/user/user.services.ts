import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../error/appError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

// create student into db
const createStudent = async (password: string, payload: IStudent) => {
	const userData: Partial<IUser> = {};

	userData.password = password || (config.default_password as string);
	userData.role = "student";

	const admissionSemester = await AcademicSemesterModel.findById(
		payload.admissionSemester
	);

	if (!admissionSemester) {
		throw new Error("Admission Semester not found");
	}
	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		userData.id = await generateStudentId(admissionSemester);
		payload.id = userData.id;
		const newUser = await User.create([userData], { session });

		if (!newUser) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				"Transaction failed to create User"
			);
		}
		payload.user = newUser[0]._id;
		const newStudent = await Student.create([payload], { session });
		if (!newStudent) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				"Transaction failed to create Student"
			);
		}

		await session.commitTransaction();
		await session.endSession();
		return newStudent;
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
	}
};

const createFaculty = async (payload: TFaculty) => {
	const facultyData: Partial<TFaculty> = {};
	facultyData.id = "2323232";
	facultyData.role = "faculty";

	const result = await Faculty.create(payload);
	return result;
};

export const userServices = {
	createStudent,
	createFaculty,
};
