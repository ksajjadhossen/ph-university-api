import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";

const months: TMonth[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const academicSemesterSchema = new Schema<TAcademicSemester>({
	name: {
		type: String,
		required: true,
	},
	year: {
		type: Date,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	startMonth: {
		type: String,
		required: true,
		enum: months,
	},
	endMonth: {
		type: String,
		required: true,
		enum: months,
	},
});

export const AcademicSemesterModel = model<TAcademicSemester>(
	"AcademicSemester",
	academicSemesterSchema
);
