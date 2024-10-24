import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyController } from "./faculty.controller";
import { facultyValidationSchema } from "./faculty.validation";

const router = Router();
router.get("/", facultyController.getAllFaculties);
router.get("/:facultyId", facultyController.getSingleFacultyById);
router.delete("/:id", facultyController.deleteFacultyById);
router.patch(
	"/:facultyId",
	validateRequest(facultyValidationSchema.updateFacultySchema),
	facultyController.updateFacultyById
);

export const facultyRouter = router;
