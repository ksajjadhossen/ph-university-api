import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/appError";
import makeFlattenedObject from "../../utils/makeFlattenObject";
import { User } from "../user/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (student: IStudent) => {
	const result = await Student.create(student);
	return result;
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
	const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
	let searchTerm = "";
	const queryObject = { ...query };

	if (query?.searchTerm) {
		searchTerm = query?.searchTerm as string;
	}

	const searchQuery = Student.find({
		$or: studentSearchableFields.map((field) => ({
			[field]: { $regex: searchTerm, $options: "i" },
		})),
	});

	const excludeFields = ["searchTerm", "sort", "page", "limit", "fields"];
	excludeFields.forEach((el) => delete queryObject[el]);

	const filterQuery = searchQuery
		.find(queryObject)
		.populate("user")
		.populate("academicDepartment")
		.populate({
			path: "academicDepartment",
			populate: {
				path: "academicFaculty",
			},
		});
	let sort = "-createdAt";

	if (query.sort) {
		sort = query.sort as string;
	}
	const sortQuery = filterQuery.sort(sort);

	let page = 1;
	let limit = 10;
	let skip = 0;

	if (query.limit) {
		limit = Number(query.limit);
	}

	if (query?.page) {
		page = query.page as number;
		skip = page - 1 * limit;
	}

	const paginateQuery = sortQuery.skip(skip);

	const limitQuery = paginateQuery.limit(limit);

	let fields = "-__v";
	if (query?.fields) {
		fields = (query.fields as string).split(",").join(" ");
	}
	const fieldQuery = await limitQuery.select(fields);
	return fieldQuery;
};

const findStudentFromDB = async (id: string) => {
	const result = await Student.findById(id);
	return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
	const updatedFlattenData = makeFlattenedObject(payload);
	const result = await Student.findOneAndUpdate({ id }, updatedFlattenData, {
		new: true,
		runValidators: true,
	});

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
		throw new Error("failed to delete student");
	}
};

export const studentServices = {
	createStudentIntoDB,
	getAllStudentsFromDB,
	findStudentFromDB,
	deleteStudentFromDB,
	updateStudentIntoDB,
};
