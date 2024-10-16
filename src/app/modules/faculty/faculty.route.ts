import { Router } from "express";
import { facultyController } from "./faculty.controller";

const router = Router();
router.get("/", facultyController.getAllFaculties);

export const facultyRouter = router;
