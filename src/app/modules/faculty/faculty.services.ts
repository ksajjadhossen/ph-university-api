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

export const facultyServices = {
	getAllFaculties,
	getSingleFacultyById,
	deleteFAcultyById,
};
