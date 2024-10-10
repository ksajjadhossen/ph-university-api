export type TFacultyName = {
	firstName: string;
	middleName: string;
	lastName: string;
};

export type TFaculty = {
	_id: string;
	id?: string;
	designation: string;
	name: TFacultyName;
	gender: string;
	dateOfBirth: string;
	email: string;
	phoneNumber: string;
	emergencyContactNumber: string;
	presentAddress: string;
	permanentAddress: string;
	profileImage?: string;
	status: string;
	academicDepartment: string;
	academicFaculty: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
};
