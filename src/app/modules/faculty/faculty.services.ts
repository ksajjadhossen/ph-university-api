import { Faculty } from "./faculty.model";

const getAllFaculties = () => {
	const result = Faculty.find();
	return result;
};

export const facultyServices = {
	getAllFaculties,
};
