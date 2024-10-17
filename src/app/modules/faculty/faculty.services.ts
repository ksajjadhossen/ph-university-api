import { Faculty } from "./faculty.model";

const getAllFaculties = async () => {
	const result = await Faculty.find();
	return result;
};

const getSingleFacultyById = async (id: string) => {
	const result = await Faculty.findOne({ id });
	console.log(result);
};

export const facultyServices = {
	getAllFaculties,
	getSingleFacultyById,
};
