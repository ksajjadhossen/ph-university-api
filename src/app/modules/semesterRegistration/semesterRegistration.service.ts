import httpStatus from "http-status";
import { AppError } from "../../error/appError";
import { AcademicSemesterModel } from "./../academicSemester/academicSemester.model";
import { semesterRegistration } from "./semesterREgistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDb = async (
	payload: TSemesterRegistration
) => {
	const academicSemester = payload?.academicSemester;

	const isAcademicSemesterExists = await AcademicSemesterModel.findById(
		academicSemester
	);

	if (!isAcademicSemesterExists) {
		throw new AppError(httpStatus.NOT_FOUND, "Academic Semester is not found");
	}

	const isThereUpcomingAndOngoingSemester = await SemesterRegistration.findOne({
		$or: [
			{ status: semesterRegistration.UPCOMING },
			{ status: semesterRegistration.ONGOING },
		],
	});

	if (isThereUpcomingAndOngoingSemester) {
		throw new AppError(
			httpStatus.NOT_FOUND,
			`here is already a ${isThereUpcomingAndOngoingSemester.status}`
		);
	}

	const isSemesterRegistrationExists = await SemesterRegistration.findOne({
		academicSemester,
	});

	if (isSemesterRegistrationExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "Semester already registered");
	}

	const result = await SemesterRegistration.create(payload);

	return result;
};
const getAllSemesterRegistrationIntoDb = async () => {
	const result = await SemesterRegistration.find().populate("academicSemester");
	return result;
};

const getSingleSemesterRegistrationIntoDb = async (id: string) => {
	const result = await SemesterRegistration.findById(id);
	return result;
};
const updateSemesterRegistrationIntoDb = async (
	id: string,
	payload: Partial<TSemesterRegistration>
) => {
	const requestedSemesterRegistration = await SemesterRegistration.findById(id);
	const requestedStatus = payload?.status;

	if (requestedSemesterRegistration?.status === semesterRegistration.ENDED) {
		throw new AppError(httpStatus.BAD_REQUEST, "Semester is already ENDED");
	}
	const currentSemesterStatus = requestedSemesterRegistration?.status;

	if (
		(currentSemesterStatus === semesterRegistration.UPCOMING &&
			requestedStatus === semesterRegistration.ENDED) ||
		(currentSemesterStatus === semesterRegistration.ONGOING &&
			requestedStatus === semesterRegistration.UPCOMING)
	) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`you can't update your status from ${currentSemesterStatus} to ${requestedStatus}`
		);
	}

	const result = await SemesterRegistration.findByIdAndUpdate(id, payload);

	return result;
};

export const semesterRegistrationServices = {
	createSemesterRegistrationIntoDb,
	getAllSemesterRegistrationIntoDb,
	getSingleSemesterRegistrationIntoDb,
	updateSemesterRegistrationIntoDb,
};
