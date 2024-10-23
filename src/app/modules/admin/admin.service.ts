import { Admin } from "./admin.model";

const getAllAdmins = async () => {
	const result = await Admin.find();
	return result;
};

export const adminServices = {
	getAllAdmins,
};
