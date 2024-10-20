import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
	const lastStudent = await User.findOne({
		role: "student",
	})
		.sort({
			createdAt: -1,
		})
		.lean();

	return lastStudent?.id ? lastStudent.id : undefined;
};
export const generateStudentId = async (payload: TAcademicSemester) => {
	let currentId = (0).toString();
	const lastStudentId = await findLastStudentId();

	const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
	const lastStudentYear = lastStudentId?.substring(0, 4);

	const currentSemesterCode = payload.code;
	const currentYear = payload.year;

	if (
		lastStudentId &&
		lastStudentSemesterCode === currentSemesterCode &&
		lastStudentYear === currentYear
	) {
		currentId = lastStudentId.substring(6);
	}

	let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

	incrementId = `${payload.year}${payload.code}${incrementId}`;

	return incrementId;
};

const findLastFacultyId = async () => {
	const lastFaculty = await User.findOne({
		role: "faculty",
	})
		.sort({ createdAt: -1 })
		.lean();

	return lastFaculty ? lastFaculty.id : undefined;
};
export const generateFacultyId = async () => {
	const firstLetter = "F";
	const lastFacultyId = await findLastFacultyId();
	const lastFacultyNumbers = lastFacultyId?.substring(2, 6);
	let incrementId = (Number(lastFacultyNumbers) + 1)
		.toString()
		.padStart(4, "0");
	incrementId = `${firstLetter}-${incrementId}`;
	if (!lastFacultyId) {
		const firstId = "0001";
		const facultyId = `${firstLetter}-${firstId}`;
		return facultyId;
	}
	return incrementId;
};
