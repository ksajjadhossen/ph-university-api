import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
	console.log(payload);
	const result = await AcademicDepartment.create(payload);
	return result;
};

const findAllAcademicDepartmentService = async () => {
	const result = await AcademicDepartment.find().populate("academicFaculty");

	return result;
};
const findSingleAcademicDepartmentById = async (id: string) => {
	const result = AcademicDepartment.findById(id).populate("academicFaculty");
	return result;
};
const updateSingleAcademicDepartmentById = async (
	id: string,
	payload: TAcademicDepartment
) => {
	const result = await AcademicDepartment.findByIdAndUpdate(id, payload);
	return result;
};

export const academicDepartmentServices = {
	createAcademicDepartment,
	findAllAcademicDepartmentService,
	findSingleAcademicDepartmentById,
	updateSingleAcademicDepartmentById,
};
