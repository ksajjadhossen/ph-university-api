import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

// create student into db
const createStudent = async (password: string, payload: IStudent) => {
	const userData: Partial<IUser> = {};

	userData.password = password || (config.default_password as string);
	userData.role = "student";

	const admissionSemester = await AcademicSemesterModel.findById(
		payload.admissionSemester
	);

	if (!admissionSemester) {
		throw new Error("Admission Semester not found");
	}

	const newUser = await User.create(userData);

	if (newUser) {
		payload.user = newUser._id;
	}

	userData.id = await generateStudentId(admissionSemester);
	payload.id = userData.id;

	const newStudent = await Student.create(payload);
	return newStudent;
};

export const userServices = {
	createStudent,
};
