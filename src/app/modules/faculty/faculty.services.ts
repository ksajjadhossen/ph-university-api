import httpStatus from "http-status";
import { AppError } from "../../error/appError";
import makeFlattenedObject from "../../utils/makeFlattenObject";
import { User } from "../user/user.model";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getAllFaculties = async () => {
	const result = await Faculty.find();
	return result;
};

const getSingleFacultyById = async (id: string) => {
	const result = await Faculty.findOne({ id });
	return result;
};

const deleteFAcultyById = async (id: string) => {
	const deleteFaculty = await Faculty.findByIdAndUpdate(
		id,
		{
			isDeleted: true,
		},
		{ new: true }
	);

	if (!deleteFaculty) {
		throw new AppError(httpStatus.BAD_REQUEST, "Faculty is not deleted");
	}
	const userId = deleteFaculty.user;

	const deleteUser = await User.findByIdAndUpdate(
		userId,
		{ isDeleted: true },
		{ new: true }
	);
	if (!deleteUser) {
		throw new AppError(httpStatus.BAD_REQUEST, "FacultyUser is not deleted");
	}
	return deleteFaculty;
};

const updateFacultyById = async (id: string, payload: Partial<TFaculty>) => {
	const updatedFlattenData = makeFlattenedObject(payload);
	const result = Faculty.findOneAndUpdate({ id }, updatedFlattenData, {
		new: true,
		runValidators: true,
	});
	return result;
};

export const facultyServices = {
	getAllFaculties,
	getSingleFacultyById,
	deleteFAcultyById,
	updateFacultyById,
};
