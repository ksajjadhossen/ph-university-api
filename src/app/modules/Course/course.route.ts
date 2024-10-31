import express from "express";
import { courseController } from "./course.controller";
const router = express.Router();

router.get("/", courseController.findCoursesFromDb);
router.post("/create-course", courseController.createCourseIntoDb);
router.get("/:id", courseController.findSingleCourseFromDb);
router.delete("/:id", courseController.deleteCourseFromDb);

export const courseRouter = router;
