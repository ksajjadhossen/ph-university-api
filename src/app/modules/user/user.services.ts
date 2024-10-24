import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../error/appError";
import { AcademicDepartment } from "../academicDepartmant/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TFaculty } from "./../faculty/faculty.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
	generateAdminId,
	generateFacultyId,
	generateStudentId,
} from "./user.utils";

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
		// userData.id = "F-0006";
		userData.id = await generateFacultyId();
		payload.id = userData.id;

		const facultyUser = await User.create([userData], { session });

		payload.user = facultyUser[0]._id;

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

		await session.commitTransaction();
		await session.endSession();
		return newFaculty[0];
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw error;
	}
};

const createAdmin = async (password: string, payload: TAdmin) => {
	const userData: Partial<IUser> = {};
	userData.role = "admin";
	userData.password = password || (config.default_password as string);

	const academicDepartment = await AcademicDepartment.findById(
		payload.academicDepartment
	);
	if (!academicDepartment) {
		throw new Error("academic Department not found");
	}
	const academicFaculty = await AcademicFaculty.findById(
		payload.academicFaculty
	);
	if (!academicFaculty) {
		throw new Error("Academic facultyNot found");
	}

	const session = await mongoose.startSession();
	try {
		await session.startTransaction();
		// userData.id = "A-0005";
		userData.id = await generateAdminId();
		payload.id = userData.id;
		const adminUser = await User.create([userData], { session });
		if (!adminUser) {
			throw new AppError(
				httpStatus.BAD_GATEWAY,
				"Transaction failed to the create Admin User"
			);
		}
		const newAdmin = await Admin.create([payload], { session });
		if (!newAdmin) {
			throw new AppError(
				httpStatus.BAD_GATEWAY,
				"Transaction failed to the create Admin"
			);
		}
		await session.commitTransaction();
		await session.endSession();
		return newAdmin[0];
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw error;
	}
};

export const userServices = {
	createStudent,
	createFaculty,
	createAdmin,
};
