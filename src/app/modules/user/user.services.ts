import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (password: string, payload: IUser) => {
	const userData: Partial<IUser> = {};

	userData.password = password || (config.default_password as string);
	userData.role = "student";

	const generateStudentId = (payload: TAcademicSemester) => {};

	userData.id = "20240100098" + userData.id || "202401089";
	const newUser = await User.create(userData);
	if (Object.keys(newUser).length) {
		payload.id = newUser.id;
		payload.user = newUser._id; // reference _id

		// create a student
		const newStudent = await Student.create(payload);
		return newStudent;
	}
};

export const userServices = {
	createUserIntoDB,
};
