import makeFlattenedObject from "../../utils/makeFlattenObject";
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
	const result = await Admin.findOneAndUpdate(
		{ id },
		{ isDeleted: true },
		{ new: true }
	);
	return result;
};

export const adminServices = {
	getAllAdminsFromDb,
	updateAdminFromDb,
	deleteAdminFromDb,
};
