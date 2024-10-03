import httpStatus from "http-status";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (student: IStudent) => {
	const result = await Student.create(student);
	return result;
};

const getAllStudentsFromDB = async () => {
	const result = await Student.find()
		.populate("user")
		.populate("academicDepartment")
		.populate({
			path: "academicDepartment",
			populate: {
				path: "academicFaculty",
			},
		});
	return result;
};
const findStudentFromDB = async (id: string) => {
	const result = await Student.findById(id);
	return result;
};

const deleteStudentFromDB = async (id: string) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const deletedStudent = await Student.findOneAndUpdate(
			{ id },
			{ isDeleted: true },
			{ new: true, session }
		);
		if (!deletedStudent) {
			throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
		}

		const deletedUser = await User.findOneAndUpdate(
			{ id },
			{ isDeleted: true },
			{ new: true, session }
		);
		if (!deletedUser) {
			throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
		}
		await session.commitTransaction();
		await session.endSession();
		return deletedStudent;
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
	}
};
// const deleteStudentFromDB = async (id: string) => {
// 	const deletedStudent = await Student.findOneAndUpdate(
// 		{ id },
// 		{ isDeleted: true },
// 		{ new: true }
// 	);

// 	return deletedStudent;
// };

export const studentServices = {
	createStudentIntoDB,
	getAllStudentsFromDB,
	findStudentFromDB,
	deleteStudentFromDB,
};
