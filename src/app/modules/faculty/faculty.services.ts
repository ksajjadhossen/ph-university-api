import makeFlattenedObject from "../../utils/makeFlattenObject";
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
	const result = await Faculty.findOneAndUpdate(
		{ id: id },
		{ isDeleted: true },
		{ new: true }
	);
	return result;
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
