import bcrypt from "bcrypt";

import { model, Schema } from "mongoose";
import config from "../../config";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
	{
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
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const user = this as IUser;
	console.log(user.password);
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

export const User = model<IUser>("User", userSchema);
