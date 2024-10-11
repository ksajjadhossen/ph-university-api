import { Router } from "express";
import { facultyController } from "./faculty.controller";

const router = Router();

router.post("/create-faculty", facultyController.createFacultyInDB);
