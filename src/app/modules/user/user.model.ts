import bcrypt from "bcrypt";

import { model, Schema } from "mongoose";
import config from "../../config";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		needsPasswordChange: {
			type: Boolean,
			default: true,
		},
		role: {
			type: String,
			enum: ["student", "faculty", "admin"],
			required: true,
		},
		status: {
			type: String,
			enum: ["in-progress", "blocked"],
			default: "in-progress",
		},
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const user = this as IUser;
	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	);
	next();
});
userSchema.post("save", function (doc, next) {
	doc.password = "";
	next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
	return await User.findOne({ id });
};

export const User = model<IUser>("User", userSchema);
