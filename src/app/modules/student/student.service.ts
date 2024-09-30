import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (student: IStudent) => {
	const result = await Student.create(student);
	return result;
};

const getAllStudentsFromDB = async () => {
	const result = await Student.find()
		.populate("user")
		.populate("academicDepartment")
		.populate({
			path: "academicDepartment",
			populate: {
				path: "academicFaculty",
			},
		});
	return result;
};
const findStudentFromDB = async (id: string) => {
	const result = await Student.aggregate([{ $match: { id } }]);
	return result;
};

export const studentServices = {
	createStudentIntoDB,
	getAllStudentsFromDB,
	findStudentFromDB,
};
