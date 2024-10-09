export interface User {
	_id: string; // MongoDB ObjectId as a string
	id?: string; // custom ID, optional
	designation: string;
	name: string;
	gender: string;
	dateOfBirth: Date;
	email: string;
	phoneNumber: string;
	emergencyContactNumber: string;
	presentAddress: string;
	permanentAddress: string;
	profileImage?: string; // URL or file path, optional
	status: string; // e.g., Active, Inactive
	academicDepartment: string;
	academicFaculty: string;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}
