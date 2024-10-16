import mongoose from "mongoose";

export interface IUser {
	user: mongoose.Types.ObjectId;
	id: string;
	password: string;
	needsPasswordChange: boolean;
	role: "student" | "faculty" | "admin";
	isDeleted: boolean;
}
