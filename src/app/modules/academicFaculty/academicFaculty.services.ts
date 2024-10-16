import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
	const result = await AcademicFaculty.create(payload);
	return result;
};

const getAllAcademicFaculty = async () => {
	const result = await AcademicFaculty.find();
	return result;
};
const getSingleAcademicFacultyById = async (id: string) => {
	const result = await AcademicFaculty.findById(id);
	return result;
};
const updateAcademicFaculty = async (id: string, payload: IAcademicFaculty) => {
	const result = await AcademicFaculty.findByIdAndUpdate(id, payload);
	return result;
};

export const academicFacultyServices = {
	createAcademicFaculty,
	getAllAcademicFaculty,
	getSingleAcademicFacultyById,
	updateAcademicFaculty,
};
