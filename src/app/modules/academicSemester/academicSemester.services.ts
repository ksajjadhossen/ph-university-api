import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
	const result = await AcademicSemesterModel.create(payload);

	if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
		throw new Error("Code mot matching...");
	}
	return result;
};

const getAllAcademicSemesterFromDB = async () => {
	const result = await AcademicSemesterModel.find();
	return result;
};

const getSingleStudentById = async (id: string) => {
	const result = AcademicSemesterModel.findOne({ id });
	return result;
};
const findAcademicSemesterAndUpdate = async (
	id: string,
	payload: TAcademicSemester
) => {
	const result = AcademicSemesterModel.findByIdAndUpdate(id, payload);
	return result;
};

export const academicSemesterServices = {
	createAcademicSemesterIntoDb,
	getAllAcademicSemesterFromDB,
	getSingleStudentById,
	findAcademicSemesterAndUpdate,
};
