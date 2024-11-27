import mongoose, { Model } from "mongoose";

export interface IUser {
	user: mongoose.Types.ObjectId;
	id: string;
	password: string;
	needsPasswordChange: boolean;
	role: "student" | "faculty" | "admin";
	status: "in-progress" | "blocked";
	isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
	isUserExistsByCustomId(id: string): Promise<IUser>;
}
