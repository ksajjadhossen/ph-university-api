import { Schema } from "mongoose";
import { semesterRegistrationStatus } from "./semesterREgistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
	{
		academicSemester: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			ref: "AcademicSemester",
		},
		status: {
			type: String,
			enum: semesterRegistrationStatus,
			default: "UPCOMING",
		},
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		minCredit: { type: Number, default: 3 },
		maxCredit: { type: Number, default: 15 },
	},
	{
		timestamps: true,
	}
);
