import { RequestHandler } from "express";
import { facultyServices } from "./faculty.services";

const createFacultyInDB: RequestHandler = (req, res) => {
	const data = req.body;
	const result = facultyServices.createFacultyIntoDB(data);
};

export const facultyController = {
	createFacultyInDB,
};
