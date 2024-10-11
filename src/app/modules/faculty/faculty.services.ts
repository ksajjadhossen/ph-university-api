import { TFaculty } from "./faculty.interface";

const createFacultyIntoDB = (payload: TFaculty) => {
	console.log(payload);
};

export const facultyServices = {
	createFacultyIntoDB,
};
