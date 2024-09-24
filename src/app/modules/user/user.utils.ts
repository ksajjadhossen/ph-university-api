import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
	const lastStudent = await User.findOne(
		{
			role: "Student",
		},
		{
			id: 1,
			_id: 0,
		}
	)

		.sort()
		.lean();
	let newStudentId = lastStudent?.id ? lastStudent.id.substring(6) : undefined;
	console.log(newStudentId);
};
export const generateStudentId = async (payload: TAcademicSemester) => {
	const currentId =
		(await findLastStudentId) || (0).toString().padStart(4, "0");
	let incrementId = (Number(currentId) + 1).toString();
	incrementId = `${payload.year}${payload.code}${incrementId}`;
	return incrementId;
};
