import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		academicFaculty: {
			type: Schema.Types.ObjectId,
			ref: "AcademicFaculty",
		},
	},
	{
		timestamps: true,
	}
);

academicDepartmentSchema.pre("save", async function (next) {
	const isDepartmentNameExist = await AcademicDepartment.findOne({
		name: this.name,
	});

	if (isDepartmentNameExist) {
		throw new Error("this department name is already exists");
	}
	next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
	const query = this.getQuery();
	const isDepartmentIdExist = await AcademicDepartment.findOne(query);

	if (!isDepartmentIdExist) {
		throw new Error("Department id is not exist");
	}

	next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
	"AcademicDepartment",
	academicDepartmentSchema
);
