import httpStatus from "http-status";
import { AppError } from "../../error/appError";
import makeFlattenedObject from "../../utils/makeFlattenObject";
import { User } from "../user/user.model";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminsFromDb = async () => {
	const result = await Admin.find();
	return result;
};
const updateAdminFromDb = async (id: string, payload: Partial<TAdmin>) => {
	const updatedFlattenData = makeFlattenedObject(payload);
	const result = await Admin.findOneAndUpdate({ id }, updatedFlattenData, {
		new: true,
		runValidators: true,
	});
	return result;
};
const deleteAdminFromDb = async (id: string) => {
	const deleteAdmin = await Admin.findByIdAndUpdate(
		id,
		{ isDeleted: true },
		{ new: true }
	);

	if (!deleteAdmin) {
		throw new AppError(httpStatus.BAD_REQUEST, "Admin not deleted");
	}
	const userId = deleteAdmin.user;
	const deleteAdminUser = await User.findByIdAndUpdate(
		userId,
		{ isDeleted: true },
		{ new: true }
	);

	if (!deleteAdminUser) {
		throw new AppError(httpStatus.BAD_REQUEST, "Admin user not found");
	}
	return deleteAdmin;
};

export const adminServices = {
	getAllAdminsFromDb,
	updateAdminFromDb,
	deleteAdminFromDb,
};
