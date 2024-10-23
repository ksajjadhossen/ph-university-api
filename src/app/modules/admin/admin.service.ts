import makeFlattenedObject from "../../utils/makeFlattenObject";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdmins = async () => {
	const result = await Admin.find();
	return result;
};
const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
	const updatedFlattenData = makeFlattenedObject(payload);
	const result = await Admin.findOneAndUpdate({ id }, updatedFlattenData, {
		new: true,
		runValidators: true,
	});
	return result;
};

export const adminServices = {
	getAllAdmins,
	updateAdmin,
};
