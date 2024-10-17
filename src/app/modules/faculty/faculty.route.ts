import { Router } from "express";
import { facultyController } from "./faculty.controller";

const router = Router();
router.get("/", facultyController.getAllFaculties);
router.get("/:facultyId", facultyController.getSingleFacultyById);
router.delete("/:facultyId", facultyController.deleteFacultyById);
router.patch("/", facultyController.getAllFaculties);

export const facultyRouter = router;
