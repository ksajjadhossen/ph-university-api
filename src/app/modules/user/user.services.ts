import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../error/appError";
import { AcademicDepartment } from "../academicDepartmant/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TFaculty } from "./../faculty/faculty.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";

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
		const newStudent = await Student.create([payload]);
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

// create faculty

const createFaculty = async (password: string, payload: TFaculty) => {
	const userData: Partial<IUser> = {};
	userData.role = "faculty";

	userData.password = password || (config.default_password as string);

	const academicFaculty = await AcademicFaculty.findById(
		payload.academicFaculty
	);

	if (!academicFaculty) {
		throw new AppError(httpStatus.BAD_REQUEST, "Academic Faculty not found.");
	}
	const academicDepartment = await AcademicDepartment.findById(
		payload.academicDepartment
	);
	if (!academicDepartment) {
		throw new AppError(httpStatus.BAD_REQUEST, "Academic Department not found");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		// userData.id = "F-0005";
		userData.id = await generateFacultyId();

		const facultyUser = await User.create([userData], { session });
		if (!facultyUser) {
			throw new AppError(httpStatus.BAD_REQUEST, "Faculty User not created");
		}
		const newFaculty = await Faculty.create([payload], { session });

		if (!newFaculty) {
			throw new AppError(
				httpStatus.BAD_GATEWAY,
				"Transaction failed to the create Faculty"
			);
		}
		console.log(facultyUser);
		session.commitTransaction();
		session.endSession();
		return newFaculty[0];
	} catch (error) {
		session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export const userServices = {
	createStudent,
	createFaculty,
};
