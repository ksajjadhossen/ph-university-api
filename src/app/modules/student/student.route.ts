import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.findStudentById);
router.delete("/:studentId", studentControllers.deleteStudentById);

export const studentRouter = router;
