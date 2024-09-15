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

export const academicSemesterServices = {
	createAcademicSemesterIntoDb,
};
